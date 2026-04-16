/**
 * RNS Admin Panel — /admin
 * Password-protected dashboard for managing the Ripple Nexus Scheduler.
 */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, CreditCard, Calendar, Settings, TrendingUp, CheckCircle,
  XCircle, ChevronDown, ChevronUp, Loader2, LogOut, Plus, Eye,
  BarChart3, RefreshCw,
} from 'lucide-react';
import type { AdminApplicant } from '@/lib/scheduler-types';

// ── Auth ──────────────────────────────────────────────────────────────────

const TOKEN_KEY = 'rns_admin_token';

function getToken() { return localStorage.getItem(TOKEN_KEY) ?? ''; }
function setToken(t: string) { localStorage.setItem(TOKEN_KEY, t); }
function clearToken() { localStorage.removeItem(TOKEN_KEY); }

async function safeJson(res: Response) {
  const text = await res.text();
  if (!text.trim()) throw new Error(`Server returned empty response (HTTP ${res.status}). Check that all env vars are set in Vercel and the function is deployed.`);
  try {
    return JSON.parse(text);
  } catch {
    // Likely an HTML error page (404/500 from Vercel)
    const hint = res.status === 404
      ? 'API route not found — ensure the project is deployed on Vercel.'
      : `Server error ${res.status} — check Vercel function logs.`;
    throw new Error(hint);
  }
}

async function adminAction(action: string, payload: Record<string, unknown> = {}) {
  const token = getToken();
  const res = await fetch('/api/scheduler/admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, token, ...payload }),
  });
  const json = await safeJson(res);
  if (!res.ok) throw new Error(json.error || 'Request failed');
  return json;
}

// ── Login Screen ──────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/scheduler/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      });
      const data = await safeJson(res);
      if (!data.token) throw new Error(data.error || 'Login failed');
      setToken(data.token);
      onLogin();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#1f56d4]/10 border border-[#1f56d4]/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-[#1f56d4]" />
            </div>
            <h1 className="text-xl font-bold text-foreground">RNS Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">Ripple Nexus Scheduler</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#1f56d4]/50 text-sm"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1f56d4] hover:bg-[#1a47b8] disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Sign In'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color = '#1f56d4', icon }: {
  label: string; value: string | number; sub?: string; color?: string; icon: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center`} style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
          <span style={{ color }}>{icon}</span>
        </div>
      </div>
      <div className="text-3xl font-black text-foreground mb-1">{value}</div>
      <div className="text-sm font-semibold text-muted-foreground">{label}</div>
      {sub && <div className="text-xs text-muted-foreground/70 mt-0.5">{sub}</div>}
    </div>
  );
}

// ── Applicants Table ──────────────────────────────────────────────────────

function ApplicantsTable({ applicants }: { applicants: AdminApplicant[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'qualified' | 'rejected'>('all');

  const filtered = applicants.filter((a) => {
    if (filter === 'qualified') return a.is_qualified;
    if (filter === 'rejected')  return !a.is_qualified;
    return true;
  });

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {(['all', 'qualified', 'rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-colors ${
              filter === f
                ? 'bg-[#1f56d4] text-white'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {f} ({
              f === 'all' ? applicants.length :
              f === 'qualified' ? applicants.filter((a) => a.is_qualified).length :
              applicants.filter((a) => !a.is_qualified).length
            })
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="space-y-2">
        {filtered.map((a) => (
          <div key={a.id} className="bg-card border border-border rounded-xl overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-card/80"
              onClick={() => setExpanded(expanded === a.id ? null : a.id)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-2 h-2 rounded-full shrink-0 ${a.is_qualified ? 'bg-[#3FBD8B]' : 'bg-amber-400'}`} />
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{a.full_name}</p>
                  <p className="text-xs text-muted-foreground truncate">{a.email} · {a.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  a.is_qualified ? 'bg-[#3FBD8B]/15 text-[#3FBD8B]' : 'bg-amber-400/15 text-amber-400'
                }`}>
                  Score: {a.qualification_score}
                </span>
                {a.booking_status && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#1f56d4]/15 text-[#1f56d4]">
                    Booked
                  </span>
                )}
                {expanded === a.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </div>
            </div>

            <AnimatePresence>
              {expanded === a.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border overflow-hidden"
                >
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Role</p>
                      <p className="text-foreground">{a.applicant_role || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Budget</p>
                      <p className="text-foreground">{a.budget_range} · {a.urgency}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Problem</p>
                      <p className="text-foreground/80 leading-relaxed">{a.problem}</p>
                    </div>
                    {!a.is_qualified && a.rejection_reason && (
                      <div className="sm:col-span-2 bg-amber-400/8 border border-amber-400/20 rounded-xl p-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">Rejection Reason</p>
                        <p className="text-foreground/70 text-xs">{a.rejection_reason}</p>
                      </div>
                    )}
                    {a.payment_status === 'completed' && (
                      <div className="sm:col-span-2 bg-[#3FBD8B]/8 border border-[#3FBD8B]/20 rounded-xl p-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#3FBD8B] mb-1">Payment</p>
                        <p className="text-foreground/70 text-xs">{a.payment_currency} {a.payment_amount} via {a.payment_provider}</p>
                      </div>
                    )}
                    {a.meet_link && (
                      <div className="sm:col-span-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Meet Link</p>
                        <a href={a.meet_link} className="text-[#1f56d4] hover:underline text-xs break-all" target="_blank" rel="noreferrer">
                          {a.meet_link}
                        </a>
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Applied</p>
                      <p className="text-foreground/70 text-xs">{new Date(a.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No applicants found</div>
        )}
      </div>
    </div>
  );
}

// ── Settings Panel ────────────────────────────────────────────────────────

function SettingsPanel() {
  const [settings, setSettings] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    adminAction('settings').then((d) => {
      const parsed: Record<string, number> = {};
      Object.entries(d.settings || {}).forEach(([k, v]) => {
        parsed[k] = Number(v);
      });
      setSettings(parsed);
    }).finally(() => setLoading(false));
  }, []);

  const save = async (key: string, value: number) => {
    setSaving(key);
    try {
      await adminAction('update-setting', { key, value });
      setSaved(key);
      setTimeout(() => setSaved(null), 2000);
    } catch {
      /* ignore */
    } finally {
      setSaving(null);
    }
  };

  const FIELDS = [
    { key: 'consultation_fee_inr',   label: 'Consultation Fee (INR)',        prefix: '₹' },
    { key: 'consultation_fee_usd',   label: 'Consultation Fee (USD)',        prefix: '$' },
    { key: 'budget_threshold_inr',   label: 'Min Budget Threshold (INR)',    prefix: '₹' },
    { key: 'budget_threshold_usd',   label: 'Min Budget Threshold (USD)',    prefix: '$' },
    { key: 'min_description_length', label: 'Min Problem Description Length', prefix: '' },
    { key: 'session_duration_minutes', label: 'Session Duration (minutes)',  prefix: '' },
  ];

  if (loading) return <div className="py-12 text-center text-muted-foreground text-sm"><Loader2 className="w-5 h-5 animate-spin mx-auto" /></div>;

  return (
    <div className="space-y-4 max-w-lg">
      {FIELDS.map(({ key, label, prefix }) => (
        <div key={key} className="bg-card border border-border rounded-xl p-5">
          <label className="block text-sm font-semibold text-foreground/80 mb-3">{label}</label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              {prefix && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">{prefix}</span>
              )}
              <input
                type="number"
                value={settings[key] ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, [key]: Number(e.target.value) }))}
                className={`w-full bg-background border border-border rounded-xl py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#1f56d4]/50 ${prefix ? 'pl-8 pr-4' : 'px-4'}`}
              />
            </div>
            <button
              onClick={() => save(key, settings[key])}
              disabled={saving === key}
              className="px-4 py-2.5 bg-[#1f56d4] hover:bg-[#1a47b8] disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors"
            >
              {saving === key ? <Loader2 className="w-4 h-4 animate-spin" /> : saved === key ? <CheckCircle className="w-4 h-4" /> : 'Save'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Slots Panel ───────────────────────────────────────────────────────────

function SlotsPanel() {
  const [slots, setSlots] = useState<Array<{ id: string; slot_date: string; start_time: string; end_time: string; is_available: boolean }>>([]);
  const [loading, setLoading] = useState(true);
  const [addDate, setAddDate] = useState('');
  const [addStart, setAddStart] = useState('09:00');
  const [addEnd, setAddEnd]   = useState('10:00');
  const [adding, setAdding]   = useState(false);

  const fetchSlots = () => {
    setLoading(true);
    adminAction('slots').then((d) => setSlots(d.slots || [])).finally(() => setLoading(false));
  };

  useEffect(() => { fetchSlots(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addSlot = async () => {
    if (!addDate) return;
    setAdding(true);
    try {
      await adminAction('add-slot', { date: addDate, startTime: addStart, endTime: addEnd });
      fetchSlots();
    } catch {/* */}
    setAdding(false);
  };

  const toggle = async (slotId: string, current: boolean) => {
    await adminAction('toggle-slot', { slotId, isAvailable: !current });
    setSlots((s) => s.map((sl) => sl.id === slotId ? { ...sl, is_available: !current } : sl));
  };

  // Group by date
  const byDate: Record<string, typeof slots> = {};
  slots.forEach((s) => {
    (byDate[s.slot_date] ??= []).push(s);
  });

  return (
    <div>
      {/* Add slot */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#1f56d4]" /> Add Availability Slot
        </h3>
        <div className="flex flex-wrap gap-3">
          <input type="date" value={addDate} onChange={(e) => setAddDate(e.target.value)}
            className="bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#1f56d4]/50" />
          <input type="time" value={addStart} onChange={(e) => setAddStart(e.target.value)}
            className="bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#1f56d4]/50" />
          <span className="self-center text-muted-foreground text-sm">to</span>
          <input type="time" value={addEnd} onChange={(e) => setAddEnd(e.target.value)}
            className="bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#1f56d4]/50" />
          <button onClick={addSlot} disabled={adding || !addDate}
            className="px-5 py-2.5 bg-[#1f56d4] hover:bg-[#1a47b8] disabled:opacity-60 text-white rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add
          </button>
          <button onClick={fetchSlots} className="px-3 py-2.5 bg-card border border-border hover:border-foreground/30 text-muted-foreground rounded-xl transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slot list */}
      {loading ? (
        <div className="py-12 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-muted-foreground" /></div>
      ) : (
        <div className="space-y-4">
          {Object.entries(byDate).sort(([a], [b]) => a.localeCompare(b)).map(([date, dateSlots]) => (
            <div key={date} className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm font-bold text-foreground mb-3">
                {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <div className="flex flex-wrap gap-2">
                {dateSlots.map((s) => (
                  <button key={s.id} onClick={() => toggle(s.id, s.is_available)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      s.is_available
                        ? 'bg-[#3FBD8B]/15 text-[#3FBD8B] border border-[#3FBD8B]/30 hover:bg-[#3FBD8B]/25'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                    }`}>
                    {s.start_time} {s.is_available ? '✓' : '✗'}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(byDate).length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">No slots configured. Add some above.</div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Admin Dashboard ──────────────────────────────────────────────────

type Tab = 'overview' | 'applicants' | 'slots' | 'settings';

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('overview');
  const [stats, setStats] = useState<Record<string, number>>({});
  const [applicants, setApplicants] = useState<AdminApplicant[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Check existing token on mount
  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    // Validate by fetching stats
    adminAction('stats').then((d) => {
      setStats(d);
      setAuthed(true);
    }).catch(() => {
      clearToken();
    }).finally(() => setLoading(false));
  }, []);

  const onLogin = async () => {
    setAuthed(true);
    const d = await adminAction('stats').catch(() => ({}));
    setStats(d);
  };

  // Load applicants when switching to that tab
  useEffect(() => {
    if (!authed || tab !== 'applicants') return;
    setDataLoading(true);
    adminAction('applicants')
      .then((d) => setApplicants(d.applicants || []))
      .catch(() => {})
      .finally(() => setDataLoading(false));
  }, [authed, tab]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f56d4]" />
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onLogin={onLogin} />;
  }

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview',    label: 'Overview',    icon: <BarChart3 className="w-4 h-4" /> },
    { key: 'applicants',  label: 'Applicants',  icon: <Users className="w-4 h-4" /> },
    { key: 'slots',       label: 'Slots',       icon: <Calendar className="w-4 h-4" /> },
    { key: 'settings',    label: 'Settings',    icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1f56d4]/10 border border-[#1f56d4]/30 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-[#1f56d4]" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">RNS Admin</p>
              <p className="text-xs text-muted-foreground">Ripple Nexus Scheduler</p>
            </div>
          </div>
          <button
            onClick={() => { clearToken(); setAuthed(false); }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>

      {/* Tab nav */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  tab === key
                    ? 'border-[#1f56d4] text-[#1f56d4]'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {tab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Applicants"    value={stats.totalApplicants ?? 0}   icon={<Users className="w-5 h-5" />} />
                <StatCard label="Qualified"           value={stats.qualified ?? 0}          icon={<CheckCircle className="w-5 h-5" />} color="#3FBD8B" />
                <StatCard label="Payments Completed"  value={stats.completedPayments ?? 0}  icon={<CreditCard className="w-5 h-5" />} />
                <StatCard label="Confirmed Bookings"  value={stats.confirmedBookings ?? 0}  icon={<Calendar className="w-5 h-5" />} color="#3FBD8B" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Qualification Rate"  value={`${stats.qualificationRate ?? 0}%`} icon={<TrendingUp className="w-5 h-5" />} sub="of all applicants" />
                <StatCard label="Conversion Rate"     value={`${stats.conversionRate ?? 0}%`}    icon={<TrendingUp className="w-5 h-5" />} sub="applicant → booking" color="#3FBD8B" />
                <StatCard label="Rejected"            value={stats.rejected ?? 0}                icon={<XCircle className="w-5 h-5" />} color="#f59e0b" />
              </div>
            </motion.div>
          )}

          {tab === 'applicants' && (
            <motion.div key="applicants" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#1f56d4]" />
                  Applicants
                </h2>
                <button onClick={() => { setDataLoading(true); adminAction('applicants').then((d) => setApplicants(d.applicants || [])).finally(() => setDataLoading(false)); }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <RefreshCw className="w-4 h-4" /> Refresh
                </button>
              </div>
              {dataLoading ? (
                <div className="py-12 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" /></div>
              ) : (
                <ApplicantsTable applicants={applicants} />
              )}
            </motion.div>
          )}

          {tab === 'slots' && (
            <motion.div key="slots" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-[#1f56d4]" />
                Availability Slots
              </h2>
              <SlotsPanel />
            </motion.div>
          )}

          {tab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-[#1f56d4]" />
                Qualification & Pricing Settings
              </h2>
              <SettingsPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
