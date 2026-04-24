import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, AlertCircle, Shield, CreditCard } from 'lucide-react';
import type { CountryInfo, PaymentData } from '@/lib/scheduler-types';

declare global {
  interface Window {
    Razorpay: new (opts: Record<string, unknown>) => { open(): void };
    paypal: { Buttons(opts: Record<string, unknown>): { render(id: string): Promise<void> } };
  }
}

interface Props {
  country: CountryInfo;
  applicantId: string;
  fullName: string;
  email: string;
  onSuccess: (payment: PaymentData) => void;
  onBack: () => void;
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

function RazorpayCheckout({ country, applicantId, fullName, email, onSuccess, onError }: {
  country: CountryInfo; applicantId: string; fullName: string; email: string;
  onSuccess: (data: PaymentData) => void; onError: (msg: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const openCheckout = async () => {
    setLoading(true);
    try {
      await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      const res = await fetch('/api/scheduler/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: 'razorpay', applicantId, countryCode: 'IN' }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error);
      if (!order.dbPaymentId) throw new Error('Payment record creation failed. Please try again.');

      const rzp = new window.Razorpay({
        key: order.key,
        amount: order.amount,
        currency: 'INR',
        name: 'Ripple Nexus',
        description: 'Premium Strategy Consultation',
        image: '/logo-icon.svg',
        order_id: order.orderId,
        prefill: { name: fullName, email },
        theme: { color: '#7C5CFF' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const vRes = await fetch('/api/scheduler/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: 'razorpay',
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              dbPaymentId: order.dbPaymentId,
            }),
          });
          const vJson = await vRes.json();
          if (!vRes.ok || !vJson.verified) throw new Error('Payment verification failed');
          onSuccess({
            provider: 'razorpay',
            orderId: order.orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: order.amount / 100,
            currency: 'INR',
            status: 'completed',
            dbPaymentId: order.dbPaymentId,
          });
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
    } catch (e: unknown) {
      onError(e instanceof Error ? e.message : 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={openCheckout}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 font-bold py-5 px-6 rounded-2xl transition-all duration-200 text-base"
      style={{
        background: loading ? 'var(--graphite-600)' : 'var(--nexus-violet)',
        color: '#fff',
        boxShadow: loading ? 'none' : '0 8px 32px -4px rgba(124,92,255,0.45)',
        opacity: loading ? 0.6 : 1,
      }}
      onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'var(--violet-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
      onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = 'var(--nexus-violet)'; e.currentTarget.style.transform = 'translateY(0)'; } }}
    >
      {loading ? (
        <><Loader2 className="w-5 h-5 animate-spin" /> Opening Razorpay…</>
      ) : (
        <><CreditCard className="w-5 h-5" /> Pay ₹{country.consultationFee.toLocaleString('en-IN')} via Razorpay</>
      )}
    </button>
  );
}

function PayPalCheckout({ country, applicantId, onSuccess, onError }: {
  country: CountryInfo; applicantId: string;
  onSuccess: (data: PaymentData) => void; onError: (msg: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    let cancelled = false;

    async function setup() {
      try {
        const res = await fetch('/api/scheduler/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider: 'paypal', applicantId, countryCode: country.countryCode }),
        });
        const order = await res.json();
        if (!res.ok) throw new Error(order.error);
        if (!order.dbPaymentId) throw new Error('Payment record creation failed. Please try again.');

        const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';
        await loadScript(`https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`);

        if (cancelled || !containerRef.current) return;

        await window.paypal.Buttons({
          style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' },
          createOrder: () => order.orderId,
          onApprove: async () => {
            const vRes = await fetch('/api/scheduler/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ provider: 'paypal', orderId: order.orderId, dbPaymentId: order.dbPaymentId }),
            });
            const vJson = await vRes.json();
            if (!vRes.ok || !vJson.verified) throw new Error('PayPal capture failed');
            onSuccess({
              provider: 'paypal', orderId: order.orderId, paymentId: vJson.paymentId,
              amount: order.amount, currency: 'USD', status: 'completed', dbPaymentId: order.dbPaymentId,
            });
          },
          onError: (err: unknown) => { onError(err instanceof Error ? err.message : 'PayPal error'); },
        }).render('#paypal-button-container');

        setLoading(false);
      } catch (e: unknown) {
        if (!cancelled) onError(e instanceof Error ? e.message : 'Could not load PayPal');
      }
    }

    setup();
    return () => { cancelled = true; };
  }, [applicantId, country, onSuccess, onError]);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center gap-3 py-6 text-sm" style={{ color: 'var(--graphite-400)' }}>
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading PayPal…
        </div>
      )}
      <div id="paypal-button-container" ref={containerRef} />
    </div>
  );
}

export default function PaymentStep({ country, applicantId, fullName, email, onSuccess, onBack }: Props) {
  const [payError, setPayError] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="max-w-md mx-auto px-4 py-16"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5"
          style={{
            background: 'rgba(124,92,255,0.1)',
            border: '1px solid rgba(124,92,255,0.3)',
            color: 'var(--nexus-violet)',
          }}
        >
          Step 3 of 3 · Secure Payment
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--pearl)', letterSpacing: '-0.02em' }}>
          Complete Your Booking
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--graphite-300)' }}>
          Your consultation is held once payment is confirmed.
        </p>
      </div>

      {/* Amount summary */}
      <div
        className="rounded-2xl p-5 mb-6 flex items-center justify-between"
        style={{ background: 'var(--ink)', border: '1px solid var(--graphite-600)' }}
      >
        <div>
          <p className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: 'var(--graphite-400)' }}>Consultation Fee</p>
          <p className="text-sm" style={{ color: 'var(--graphite-300)' }}>60-min strategy session · {country.country}</p>
        </div>
        <div className="text-2xl font-black" style={{ color: 'var(--pearl)' }}>
          {country.symbol}{country.consultationFee.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Payment gateway */}
      <div className="mb-6">
        {country.isIndia ? (
          <RazorpayCheckout country={country} applicantId={applicantId} fullName={fullName} email={email} onSuccess={onSuccess} onError={setPayError} />
        ) : (
          <PayPalCheckout country={country} applicantId={applicantId} onSuccess={onSuccess} onError={setPayError} />
        )}
      </div>

      {/* Error */}
      <AnimatePresence>
        {payError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-xl p-4 mb-6"
            style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)' }}
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{payError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security note */}
      <div className="flex items-start gap-3 text-xs mb-8" style={{ color: 'var(--graphite-400)' }}>
        <Shield className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--quantum-lime)' }} />
        <span>256-bit encrypted. We never store card details. Powered by {country.isIndia ? 'Razorpay' : 'PayPal'}.</span>
      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm transition-colors"
        style={{ color: 'var(--graphite-400)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'var(--pearl)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--graphite-400)')}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to pricing
      </button>
    </motion.div>
  );
}
