import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, isSameDay, parseISO, isWeekend } from 'date-fns';
import { ArrowLeft, Loader2, AlertCircle, Calendar, Clock, Globe } from 'lucide-react';
import type { PaymentData, BookingData } from '@/lib/scheduler-types';

interface ApiSlot {
  id: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

interface Props {
  applicantId: string;
  payment: PaymentData;
  fullName: string;
  email: string;
  onBooked: (data: BookingData) => void;
}

function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function buildWeekDays(): Date[] {
  const days: Date[] = [];
  let d = addDays(new Date(), 1);
  while (days.length < 14) {
    if (!isWeekend(d)) days.push(new Date(d));
    d = addDays(d, 1);
  }
  return days;
}

export default function BookingStep({ applicantId, payment, fullName, email, onBooked }: Props) {
  const [slots, setSlots] = useState<ApiSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [slotsError, setSlotsError] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<ApiSlot | null>(null);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState('');
  const timezone = getUserTimezone();
  const weekDays = buildWeekDays();

  useEffect(() => {
    const from = format(weekDays[0], 'yyyy-MM-dd');
    const to   = format(weekDays[weekDays.length - 1], 'yyyy-MM-dd');
    fetch(`/api/scheduler/slots?from=${from}&to=${to}`)
      .then((r) => r.json())
      .then((d) => setSlots(d.slots || []))
      .catch(() => { setSlotsError('Unable to load available slots. Please refresh the page.'); setSlots([]); })
      .finally(() => setLoadingSlots(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const slotsForDate = (date: Date) =>
    slots.filter((s) => isSameDay(parseISO(s.slot_date), date) && s.is_available);

  const hasSlots = (date: Date) => slotsForDate(date).length > 0;

  const handleConfirm = async () => {
    if (!selectedSlot) return;
    setBooking(true);
    setError('');
    try {
      const res = await fetch('/api/scheduler/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantId, paymentDbId: payment.dbPaymentId,
          slotId: selectedSlot.id, timezone, fullName, email,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      onBooked({
        slotId: selectedSlot.id,
        date: json.slotDate,
        startTime: json.startTime,
        endTime: json.endTime,
        timezone,
        meetLink: json.meetLink,
        bookingId: json.bookingId,
      });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Booking failed. Please try again.');
      setBooking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="max-w-2xl mx-auto px-4 py-16"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5"
          style={{
            background: 'rgba(163,230,53,0.1)',
            border: '1px solid rgba(163,230,53,0.3)',
            color: 'var(--quantum-lime)',
          }}
        >
          Payment Confirmed · Book Your Slot
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--pearl)', letterSpacing: '-0.025em' }}>
          Choose Your Session Time
        </h2>
        <div className="flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--graphite-400)' }}>
          <Globe className="w-4 h-4" />
          Your timezone: <span className="font-medium" style={{ color: 'var(--pearl)' }}>{timezone}</span>
        </div>
        <p className="text-xs mt-1" style={{ color: 'var(--graphite-500)' }}>Slot times shown in IST (India Standard Time)</p>
      </div>

      {loadingSlots ? (
        <div className="flex items-center justify-center gap-3 py-16" style={{ color: 'var(--graphite-400)' }}>
          <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--nexus-violet)' }} />
          Loading available slots…
        </div>
      ) : slotsError ? (
        <div className="flex items-start gap-3 rounded-xl p-4" style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)' }}>
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{slotsError}</p>
        </div>
      ) : (
        <>
          {/* Date selector */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ color: 'var(--graphite-300)' }}>
              <Calendar className="w-4 h-4" style={{ color: 'var(--nexus-violet)' }} />
              Select Date
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {weekDays.map((date) => {
                const hasSlt = hasSlots(date);
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                return (
                  <button
                    key={date.toISOString()}
                    disabled={!hasSlt}
                    onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                    className="shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150 min-w-[64px]"
                    style={
                      isSelected
                        ? { background: 'var(--nexus-violet)', border: '1px solid var(--nexus-violet)', color: '#fff' }
                        : hasSlt
                        ? { background: 'var(--ink)', border: '1px solid var(--graphite-600)', color: 'var(--pearl)' }
                        : { background: 'rgba(18,20,31,0.4)', border: '1px solid rgba(42,46,68,0.4)', color: 'var(--graphite-500)', cursor: 'not-allowed' }
                    }
                    onMouseEnter={e => { if (hasSlt && !isSelected) e.currentTarget.style.borderColor = 'rgba(124,92,255,0.5)'; }}
                    onMouseLeave={e => { if (hasSlt && !isSelected) e.currentTarget.style.borderColor = 'var(--graphite-600)'; }}
                  >
                    <span className="text-xs font-bold uppercase opacity-70">{format(date, 'EEE')}</span>
                    <span className="text-lg font-black">{format(date, 'd')}</span>
                    <span className="text-xs opacity-70">{format(date, 'MMM')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <AnimatePresence mode="wait">
            {selectedDate && (
              <motion.div
                key={selectedDate.toISOString()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ color: 'var(--graphite-300)' }}>
                  <Clock className="w-4 h-4" style={{ color: 'var(--nexus-violet)' }} />
                  Available Times on {format(selectedDate, 'MMMM d, yyyy')}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {slotsForDate(selectedDate).map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className="py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-150"
                      style={
                        selectedSlot?.id === slot.id
                          ? { background: 'var(--nexus-violet)', border: '1px solid var(--nexus-violet)', color: '#fff' }
                          : { background: 'var(--ink)', border: '1px solid var(--graphite-600)', color: 'var(--pearl)' }
                      }
                      onMouseEnter={e => { if (selectedSlot?.id !== slot.id) e.currentTarget.style.borderColor = 'rgba(124,92,255,0.5)'; }}
                      onMouseLeave={e => { if (selectedSlot?.id !== slot.id) e.currentTarget.style.borderColor = 'var(--graphite-600)'; }}
                    >
                      {slot.start_time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selected summary */}
          <AnimatePresence>
            {selectedSlot && selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl p-5 mb-6"
                style={{ background: 'rgba(124,92,255,0.07)', border: '1px solid rgba(124,92,255,0.3)' }}
              >
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--nexus-violet)' }}>Your session</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--pearl)' }}>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--graphite-400)' }}>
                      {selectedSlot.start_time} – {selectedSlot.end_time} IST · 60 min
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-start gap-3 rounded-xl p-4 mb-6"
                style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)' }}
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confirm */}
          <button
            onClick={handleConfirm}
            disabled={!selectedSlot || booking}
            className="w-full flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-2xl transition-all duration-200 text-base"
            style={{
              background: !selectedSlot || booking ? 'var(--graphite-600)' : 'var(--nexus-violet)',
              color: '#fff',
              boxShadow: !selectedSlot || booking ? 'none' : '0 8px 32px -4px rgba(124,92,255,0.45)',
              opacity: !selectedSlot || booking ? 0.5 : 1,
            }}
            onMouseEnter={e => { if (selectedSlot && !booking) { e.currentTarget.style.background = 'var(--violet-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
            onMouseLeave={e => { if (selectedSlot && !booking) { e.currentTarget.style.background = 'var(--nexus-violet)'; e.currentTarget.style.transform = 'translateY(0)'; } }}
          >
            {booking ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Confirming booking…</>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </>
      )}
    </motion.div>
  );
}
