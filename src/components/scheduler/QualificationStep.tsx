import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Loader2, AlertCircle, Linkedin } from 'lucide-react';
import { URGENCY_OPTIONS } from '@/lib/rns-country';
import type { CountryInfo, QualificationFormData } from '@/lib/scheduler-types';

interface Props {
  country: CountryInfo;
  onQualified: (data: QualificationFormData, applicantId: string) => void;
  onRejected: (reason: string, score: number, data: QualificationFormData) => void;
  onBack: () => void;
}

const schema = z.object({
  fullName:           z.string().min(2, 'Full name required'),
  email:              z.string().email('Valid email required'),
  linkedinUrl:        z.string().url('Valid LinkedIn URL required').includes('linkedin.com', { message: 'Must be a LinkedIn URL' }),
  currentRole:        z.string().min(3, 'Tell us your role / experience'),
  problem:            z.string().min(60, 'Please describe your challenge in at least 60 characters'),
  budgetRange:        z.string().min(1, 'Select a budget range'),
  budgetNumericValue: z.number(),
  urgency:            z.enum(['immediate', '1-3months', '3-6months', 'exploring']),
});

type FormValues = z.infer<typeof schema>;

const inputBase = 'w-full rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none';

export default function QualificationStep({ country, onQualified, onRejected, onBack }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);

  const {
    register, handleSubmit, setValue, watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { urgency: '1-3months', budgetNumericValue: 0 },
  });

  const selectedBudget  = watch('budgetRange');
  const selectedUrgency = watch('urgency');

  const onBudgetSelect = (opt: typeof country.budgetOptions[0]) => {
    setValue('budgetRange', opt.value, { shouldValidate: true });
    setValue('budgetNumericValue', opt.numericValue);
  };

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/scheduler/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, countryCode: country.countryCode, country: country.country }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Submission failed');
      const formData: QualificationFormData = { ...values };
      if (json.qualified) {
        onQualified(formData, json.applicantId);
      } else {
        onRejected(json.reason || 'Not a fit at this time', json.score, formData);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = (hasError?: boolean) => [
    inputBase,
    'font-body',
  ].join(' ') + (hasError
    ? '; border: 1px solid #F43F5E; background: var(--ink); color: var(--pearl);'
    : '; border: 1px solid var(--graphite-600); background: var(--ink); color: var(--pearl);'
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="max-w-2xl mx-auto px-4 py-16"
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5"
          style={{
            background: 'rgba(124,92,255,0.1)',
            border: '1px solid rgba(124,92,255,0.3)',
            color: 'var(--nexus-violet)',
          }}
        >
          Step 1 of 3 · Qualification
        </div>
        <h2
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
          style={{ color: 'var(--pearl)', letterSpacing: '-0.025em' }}
        >
          Tell Us About Your Challenge
        </h2>
        <p className="text-base leading-relaxed" style={{ color: 'var(--graphite-300)' }}>
          This takes 2 minutes. Be specific — vague answers are automatically filtered.
          Only serious engagements proceed.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--pearl)' }}>Full Name *</label>
            <input
              {...register('fullName')}
              placeholder="Alex Johnson"
              className={inputBase + ' font-body'}
              style={{
                border: errors.fullName ? '1px solid #F43F5E' : '1px solid var(--graphite-600)',
                background: 'var(--ink)', color: 'var(--pearl)',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--nexus-violet)')}
              onBlur={e => (e.currentTarget.style.borderColor = errors.fullName ? '#F43F5E' : 'var(--graphite-600)')}
            />
            {errors.fullName && <p className="text-red-400 text-xs mt-1.5">{errors.fullName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--pearl)' }}>Work Email *</label>
            <input
              {...register('email')}
              type="email"
              placeholder="alex@company.com"
              className={inputBase + ' font-body'}
              style={{
                border: errors.email ? '1px solid #F43F5E' : '1px solid var(--graphite-600)',
                background: 'var(--ink)', color: 'var(--pearl)',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--nexus-violet)')}
              onBlur={e => (e.currentTarget.style.borderColor = errors.email ? '#F43F5E' : 'var(--graphite-600)')}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--pearl)' }}>
            <span className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" style={{ color: '#0077b5' }} />
              LinkedIn Profile *
            </span>
          </label>
          <input
            {...register('linkedinUrl')}
            placeholder="https://linkedin.com/in/your-profile"
            className={inputBase + ' font-body'}
            style={{
              border: errors.linkedinUrl ? '1px solid #F43F5E' : '1px solid var(--graphite-600)',
              background: 'var(--ink)', color: 'var(--pearl)',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--nexus-violet)')}
            onBlur={e => (e.currentTarget.style.borderColor = errors.linkedinUrl ? '#F43F5E' : 'var(--graphite-600)')}
          />
          {errors.linkedinUrl && <p className="text-red-400 text-xs mt-1.5">{errors.linkedinUrl.message}</p>}
        </div>

        {/* Current Role */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--pearl)' }}>Current Role & Experience *</label>
          <input
            {...register('currentRole')}
            placeholder="e.g., Founder of a 12-person B2B SaaS company, 6 years in fintech"
            className={inputBase + ' font-body'}
            style={{
              border: errors.currentRole ? '1px solid #F43F5E' : '1px solid var(--graphite-600)',
              background: 'var(--ink)', color: 'var(--pearl)',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--nexus-violet)')}
            onBlur={e => (e.currentTarget.style.borderColor = errors.currentRole ? '#F43F5E' : 'var(--graphite-600)')}
          />
          {errors.currentRole && <p className="text-red-400 text-xs mt-1.5">{errors.currentRole.message}</p>}
        </div>

        {/* Problem */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--pearl)' }}>
            What problem are you trying to solve? *
            <span
              className="ml-2 font-normal text-xs"
              style={{ color: charCount >= 60 ? 'var(--quantum-lime)' : 'var(--graphite-400)' }}
            >
              {charCount} / 60 min
            </span>
          </label>
          <textarea
            {...register('problem')}
            rows={5}
            placeholder="Be specific. What's breaking, costing you, or blocking growth? Include numbers/metrics if possible (e.g., 'our onboarding flow has 73% drop-off and we're losing ~$15k/month in churn...')"
            className={inputBase + ' font-body resize-none leading-relaxed'}
            style={{
              border: errors.problem ? '1px solid #F43F5E' : '1px solid var(--graphite-600)',
              background: 'var(--ink)', color: 'var(--pearl)',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--nexus-violet)')}
            onBlur={e => (e.currentTarget.style.borderColor = errors.problem ? '#F43F5E' : 'var(--graphite-600)')}
            onChange={(e) => {
              register('problem').onChange(e);
              setCharCount(e.target.value.length);
            }}
          />
          {errors.problem && <p className="text-red-400 text-xs mt-1.5">{errors.problem.message}</p>}
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--pearl)' }}>Budget Range for This Engagement *</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {country.budgetOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => onBudgetSelect(opt)}
                className="text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150"
                style={
                  selectedBudget === opt.value
                    ? { background: 'rgba(124,92,255,0.15)', border: '1px solid var(--nexus-violet)', color: 'var(--nexus-violet)' }
                    : { background: 'var(--ink)', border: '1px solid var(--graphite-600)', color: 'var(--pearl)' }
                }
                onMouseEnter={e => {
                  if (selectedBudget !== opt.value) {
                    e.currentTarget.style.borderColor = 'rgba(124,92,255,0.5)';
                  }
                }}
                onMouseLeave={e => {
                  if (selectedBudget !== opt.value) {
                    e.currentTarget.style.borderColor = 'var(--graphite-600)';
                  }
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {errors.budgetRange && <p className="text-red-400 text-xs mt-2">{errors.budgetRange.message}</p>}
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--pearl)' }}>Timeline / Urgency *</label>
          <div className="space-y-2.5">
            {URGENCY_OPTIONS.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => setValue('urgency', opt.value, { shouldValidate: true })}
                className="w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150"
                style={
                  selectedUrgency === opt.value
                    ? { background: 'rgba(124,92,255,0.15)', border: '1px solid var(--nexus-violet)', color: 'var(--nexus-violet)' }
                    : { background: 'var(--ink)', border: '1px solid var(--graphite-600)', color: 'var(--pearl)' }
                }
                onMouseEnter={e => {
                  if (selectedUrgency !== opt.value) {
                    e.currentTarget.style.borderColor = 'rgba(124,92,255,0.5)';
                  }
                }}
                onMouseLeave={e => {
                  if (selectedUrgency !== opt.value) {
                    e.currentTarget.style.borderColor = 'var(--graphite-600)';
                  }
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {errors.urgency && <p className="text-red-400 text-xs mt-2">{errors.urgency.message}</p>}
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 rounded-xl p-4"
              style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)' }}
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-colors"
            style={{ border: '1px solid var(--graphite-600)', color: 'var(--graphite-400)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--graphite-300)'; e.currentTarget.style.color = 'var(--pearl)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--graphite-600)'; e.currentTarget.style.color = 'var(--graphite-400)'; }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl transition-all duration-200"
            style={{
              background: submitting ? 'var(--graphite-600)' : 'var(--nexus-violet)',
              color: '#fff',
              boxShadow: submitting ? 'none' : '0 8px 32px -4px rgba(124,92,255,0.4)',
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Evaluating…</>
            ) : (
              <>Submit Application <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
