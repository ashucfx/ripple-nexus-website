import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, Video, Mail, RefreshCw } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import type { BookingData, QualificationFormData } from '@/lib/scheduler-types';

interface Props {
  booking: BookingData;
  applicant: QualificationFormData;
}

export default function ConfirmationStep({ booking, applicant }: Props) {
  const dateLabel = booking.date
    ? format(parseISO(booking.date), 'EEEE, MMMM d, yyyy')
    : '';

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
          <div className="w-24 h-24 rounded-full bg-[#3FBD8B]/15 border-2 border-[#3FBD8B]/40 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-[#3FBD8B]" />
          </div>
          <div className="absolute inset-0 rounded-full bg-[#3FBD8B]/10 animate-ping" />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-3">
          You're All Set, {applicant.fullName.split(' ')[0]}!
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed mb-10">
          Your premium consultation is confirmed. A confirmation email has been sent to{' '}
          <span className="text-foreground font-medium">{applicant.email}</span>.
        </p>
      </motion.div>

      {/* Booking details card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-2xl p-6 mb-6 text-left"
      >
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Booking Details</p>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-[#1f56d4] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Date</p>
              <p className="text-foreground font-semibold text-sm">{dateLabel}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#1f56d4] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Time</p>
              <p className="text-foreground font-semibold text-sm">
                {booking.startTime} – {booking.endTime} IST
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Your timezone: {booking.timezone}</p>
            </div>
          </div>

          {booking.meetLink ? (
            <div className="flex items-start gap-3">
              <Video className="w-4 h-4 text-[#3FBD8B] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Google Meet</p>
                <a
                  href={booking.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1f56d4] hover:underline font-semibold text-sm break-all"
                >
                  {booking.meetLink}
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <Video className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Meeting Link</p>
                <p className="text-foreground text-sm">Will be sent 24 hours before the session</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-[#1f56d4] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Confirmation sent to</p>
              <p className="text-foreground font-semibold text-sm">{applicant.email}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reschedule note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-start gap-3 bg-card/50 border border-border rounded-xl p-4 text-left mb-8"
      >
        <RefreshCw className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Need to reschedule? Reply to your confirmation email at least 24 hours before the session.
          Cancellations within 24 hours are non-refundable.
        </p>
      </motion.div>

      {/* Next steps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <p className="text-sm font-semibold text-foreground/70 mb-4">Before your session:</p>
        <div className="space-y-2 text-sm text-muted-foreground text-left">
          {[
            'Prepare a 2-3 sentence summary of your biggest bottleneck',
            'Have your key metrics ready (revenue, churn, conversion rates, etc.)',
            'Think about what a successful outcome looks like in 90 days',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#1f56d4] font-bold shrink-0">{i + 1}.</span>
              {tip}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
