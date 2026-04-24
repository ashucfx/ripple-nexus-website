import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, Video, Mail, RefreshCw } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import type { BookingData, QualificationFormData } from '@/lib/scheduler-types';

interface Props {
  booking: BookingData;
  applicant: QualificationFormData;
}

export default function ConfirmationStep({ booking, applicant }: Props) {
  const dateLabel = booking.date ? format(parseISO(booking.date), 'EEEE, MMMM d, yyyy') : '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg mx-auto px-4 py-16 text-center"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="flex justify-center mb-8"
      >
        <div className="relative">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(163,230,53,0.12)',
              border: '2px solid rgba(163,230,53,0.35)',
            }}
          >
            <CheckCircle className="w-12 h-12" style={{ color: 'var(--quantum-lime)' }} />
          </div>
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: 'rgba(163,230,53,0.08)' }}
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--pearl)', letterSpacing: '-0.025em' }}>
          You&apos;re All Set, {applicant.fullName.split(' ')[0]}!
        </h2>
        <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--graphite-300)' }}>
          Your premium consultation is confirmed. A confirmation email has been sent to{' '}
          <span className="font-medium" style={{ color: 'var(--pearl)' }}>{applicant.email}</span>.
        </p>
      </motion.div>

      {/* Booking details card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl p-6 mb-6 text-left"
        style={{ background: 'var(--ink)', border: '1px solid var(--graphite-600)' }}
      >
        <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--graphite-400)' }}>Booking Details</p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--nexus-violet)' }} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--graphite-400)' }}>Date</p>
              <p className="font-semibold text-sm" style={{ color: 'var(--pearl)' }}>{dateLabel}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--nexus-violet)' }} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--graphite-400)' }}>Time</p>
              <p className="font-semibold text-sm" style={{ color: 'var(--pearl)' }}>
                {booking.startTime} – {booking.endTime} IST
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--graphite-500)' }}>Your timezone: {booking.timezone}</p>
            </div>
          </div>

          {booking.meetLink ? (
            <div className="flex items-start gap-3">
              <Video className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--quantum-lime)' }} />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--graphite-400)' }}>Google Meet</p>
                <a
                  href={booking.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sm break-all hover:underline"
                  style={{ color: 'var(--nexus-violet)' }}
                >
                  {booking.meetLink}
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <Video className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#FBBF24' }} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--graphite-400)' }}>Meeting Link</p>
                <p className="text-sm" style={{ color: 'var(--pearl)' }}>Will be sent 24 hours before the session</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--nexus-violet)' }} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--graphite-400)' }}>Confirmation sent to</p>
              <p className="font-semibold text-sm" style={{ color: 'var(--pearl)' }}>{applicant.email}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reschedule note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-start gap-3 rounded-xl p-4 text-left mb-8"
        style={{ background: 'var(--ink)', border: '1px solid var(--graphite-600)' }}
      >
        <RefreshCw className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--graphite-400)' }} />
        <p className="text-xs leading-relaxed" style={{ color: 'var(--graphite-400)' }}>
          Need to reschedule? Reply to your confirmation email at least 24 hours before the session.
          Cancellations within 24 hours are non-refundable.
        </p>
      </motion.div>

      {/* Next steps */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <p className="text-sm font-semibold mb-4" style={{ color: 'var(--graphite-400)' }}>Before your session:</p>
        <div className="space-y-2 text-sm text-left" style={{ color: 'var(--graphite-400)' }}>
          {[
            'Prepare a 2-3 sentence summary of your biggest bottleneck',
            'Have your key metrics ready (revenue, churn, conversion rates, etc.)',
            'Think about what a successful outcome looks like in 90 days',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="font-bold shrink-0" style={{ color: 'var(--nexus-violet)' }}>{i + 1}.</span>
              {tip}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
