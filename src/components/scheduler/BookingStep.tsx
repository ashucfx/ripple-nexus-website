import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, isSameDay, parseISO, isWeekend } from 'date-fns';
import { ArrowLeft, Loader2, AlertCircle, Calendar, Clock, Globe } from 'lucide-react';
import type { PaymentData, BookingData } from '@/lib/scheduler-types';

// API slot shape (snake_case from Supabase)
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
  let d = new Date();
  // Start from tomorrow
  d = addDays(d, 1);
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
      .catch(() => {
        setSlotsError('Unable to load available slots. Please refresh the page.');
        setSlots([]);
      })
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
          applicantId,
          paymentDbId: payment.dbPaymentId,
          slotId: selectedSlot.id,
          timezone,
          fullName,
          email,
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
        <div className="inline-flex items-center gap-2 bg-[#3FBD8B]/10 border border-[#3FBD8B]/30 text-[#3FBD8B] rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
          Payment Confirmed · Book Your Slot
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-3">
          Choose Your Session Time
        </h2>
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <Globe className="w-4 h-4" />
          Your timezone: <span className="text-foreground font-medium">{timezone}</span>
        </div>
        <p className="text-muted-foreground text-xs mt-1">Slot times shown in IST (India Standard Time)</p>
      </div>

      {loadingSlots ? (
        <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading available slots…
        </div>
      ) : slotsError ? (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{slotsError}</p>
        </div>
      ) : (
        <>
          {/* Date selector */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80 mb-4">
              <Calendar className="w-4 h-4 text-[#1f56d4]" />
              Select Date
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {weekDays.map((date) => {
                const hasSlt = hasSlots(date);
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                return (
                  <button
                    key={date.toISOString()}
                    disabled={!hasSlt}
                    onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                    className={`shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150 min-w-[64px] ${
                      isSelected
                        ? 'bg-[#1f56d4] border-[#1f56d4] text-white'
                        : hasSlt
                        ? 'bg-card border-border text-foreground hover:border-[#1f56d4]/60'
                        : 'bg-card/40 border-border/40 text-muted-foreground/40 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase opacity-70">
                      {format(date, 'EEE')}
                    </span>
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
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80 mb-4">
                  <Clock className="w-4 h-4 text-[#1f56d4]" />
                  Available Times on {format(selectedDate, 'MMMM d, yyyy')}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {slotsForDate(selectedDate).map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-150 ${
                        selectedSlot?.id === slot.id
                          ? 'bg-[#1f56d4] border-[#1f56d4] text-white'
                          : 'bg-card border-border text-foreground hover:border-[#1f56d4]/60'
                      }`}
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
                className="bg-[#1f56d4]/8 border border-[#1f56d4]/30 rounded-2xl p-5 mb-6"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[#1f56d4] mb-3">Your session</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground font-semibold">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                    <p className="text-muted-foreground text-sm mt-0.5">
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6"
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
            className="w-full flex items-center justify-center gap-2 bg-[#3FBD8B] hover:bg-[#35a87a] disabled:opacity-50 text-white font-bold py-4 px-6 rounded-2xl transition-colors text-base"
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
