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

// ── Razorpay Component ────────────────────────────────────────────────────

function RazorpayCheckout({ country, applicantId, fullName, email, onSuccess, onError }: {
  country: CountryInfo;
  applicantId: string;
  fullName: string;
  email: string;
  onSuccess: (data: PaymentData) => void;
  onError: (msg: string) => void;
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
        theme: { color: '#1f56d4' },
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          // Verify server-side
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
      className="w-full flex items-center justify-center gap-3 bg-[#1f56d4] hover:bg-[#1a47b8] disabled:opacity-60 text-white font-bold py-5 px-6 rounded-2xl transition-colors text-base"
    >
      {loading ? (
        <><Loader2 className="w-5 h-5 animate-spin" /> Opening Razorpay…</>
      ) : (
        <><CreditCard className="w-5 h-5" /> Pay ₹{country.consultationFee.toLocaleString('en-IN')} via Razorpay</>
      )}
    </button>
  );
}

// ── PayPal Component ──────────────────────────────────────────────────────

function PayPalCheckout({ country, applicantId, onSuccess, onError }: {
  country: CountryInfo;
  applicantId: string;
  onSuccess: (data: PaymentData) => void;
  onError: (msg: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Prevents double-init in React StrictMode (effect fires twice in dev)
  const initializedRef = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Guard against StrictMode double-invoke
    if (initializedRef.current) return;
    initializedRef.current = true;

    let cancelled = false;

    async function setup() {
      try {
        // Create order first
        const res = await fetch('/api/scheduler/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ provider: 'paypal', applicantId, countryCode: country.countryCode }),
        });
        const order = await res.json();
        if (!res.ok) throw new Error(order.error);
        if (!order.dbPaymentId) throw new Error('Payment record creation failed. Please try again.');

        // Load PayPal SDK
        const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';
        await loadScript(`https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`);

        if (cancelled || !containerRef.current) return;

        await window.paypal
          .Buttons({
            style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' },
            createOrder: () => order.orderId,
            onApprove: async () => {
              // Capture server-side
              const vRes = await fetch('/api/scheduler/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  provider: 'paypal',
                  orderId: order.orderId,
                  dbPaymentId: order.dbPaymentId,
                }),
              });
              const vJson = await vRes.json();
              if (!vRes.ok || !vJson.verified) throw new Error('PayPal capture failed');

              onSuccess({
                provider: 'paypal',
                orderId: order.orderId,
                paymentId: vJson.paymentId,
                amount: order.amount,
                currency: 'USD',
                status: 'completed',
                dbPaymentId: order.dbPaymentId,
              });
            },
            onError: (err: unknown) => {
              onError(err instanceof Error ? err.message : 'PayPal error');
            },
          })
          .render('#paypal-button-container');

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
        <div className="flex items-center justify-center gap-3 py-6 text-muted-foreground text-sm">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading PayPal…
        </div>
      )}
      <div id="paypal-button-container" ref={containerRef} />
    </div>
  );
}

// ── Main PaymentStep ──────────────────────────────────────────────────────

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
        <div className="inline-flex items-center gap-2 bg-[#1f56d4]/10 border border-[#1f56d4]/30 text-[#1f56d4] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
          Step 3 of 3 · Secure Payment
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-3">
          Complete Your Booking
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Your consultation is held once payment is confirmed.
        </p>
      </div>

      {/* Amount summary */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Consultation Fee</p>
          <p className="text-sm text-foreground/80">60-min strategy session · {country.country}</p>
        </div>
        <div className="text-2xl font-black text-foreground">
          {country.symbol}{country.consultationFee.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Payment gateway */}
      <div className="mb-6">
        {country.isIndia ? (
          <RazorpayCheckout
            country={country}
            applicantId={applicantId}
            fullName={fullName}
            email={email}
            onSuccess={onSuccess}
            onError={setPayError}
          />
        ) : (
          <PayPalCheckout
            country={country}
            applicantId={applicantId}
            onSuccess={onSuccess}
            onError={setPayError}
          />
        )}
      </div>

      {/* Error */}
      <AnimatePresence>
        {payError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{payError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security note */}
      <div className="flex items-start gap-3 text-xs text-muted-foreground mb-8">
        <Shield className="w-4 h-4 shrink-0 mt-0.5 text-[#3FBD8B]" />
        <span>256-bit encrypted. We never store card details. Powered by {country.isIndia ? 'Razorpay' : 'PayPal'}.</span>
      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to pricing
      </button>
    </motion.div>
  );
}
