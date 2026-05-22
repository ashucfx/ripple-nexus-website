/**
 * RNS Admin Panel — /admin
 * Password-protected dashboard for managing the Ripple Nexus Scheduler.
 */
import { useEffect, useState, useCallback } from 'react';
import SEOHead from '@/components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, CreditCard, Calendar, Settings, TrendingUp, CheckCircle,
  XCircle, ChevronDown, ChevronUp, Loader2, LogOut, Plus,
  BarChart3, RefreshCw, Trash2, AlertTriangle, Search, DollarSign,
  IndianRupee, Clock, Activity, Shield, Briefcase, ExternalLink,
} from 'lucide-react';
import type { AdminApplicant } from '@/lib/scheduler-types';

// ── Auth ──────────────────────────────────────────────────────────────────

const TOKEN_KEY = 'rns_admin_token';

function getToken() { return localStorage.getItem(TOKEN_KEY) ?? ''; }
function setToken(t: string) { localStorage.setItem(TOKEN_KEY, t); }
function clearToken() { localStorage.removeItem(TOKEN_KEY); }

async function safeJson(res: Response) {
  const text = await res.text();
  if (!text.trim()) throw new Error(`Server returned empty response (HTTP ${res.status}). Check that all env vars are set in Vercel.`);
  try {
    return JSON.parse(text);
  } catch {
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

// ── Confirm Dialog ────────────────────────────────────────────────────────

function ConfirmDialog({
  message, onConfirm, onCancel, danger = true,
}: {
  message: string; onConfirm: () => void; onCancel: () => void; danger?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl"
      >
        <div className="flex items-start gap-3 mb-5">
          <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${danger ? 'text-red-400' : 'text-amber-400'}`} />
          <p className="text-sm text-foreground leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-card border border-border rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-colors ${
              danger ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'
            }`}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#1f56d4]/10 border border-[#1f56d4]/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-[#1f56d4]" />
            </div>
            <h1 className="text-xl font-bold text-foreground">RNS Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">Ripple Nexus Scheduler</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-1.5">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#1f56d4]/50 text-sm"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">
                <XCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#1f56d4] hover:bg-[#1a47b8] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────

function StatCard({
  label, value, sub, color = '#1f56d4', icon, trend,
}: {
  label: string; value: string | number; sub?: string; color?: string;
  icon: React.ReactNode; trend?: { value: string; positive: boolean };
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend.positive ? 'text-[#3FBD8B] bg-[#3FBD8B]/10' : 'text-red-400 bg-red-400/10'}`}>
            {trend.value}
          </span>
        )}
      </div>
      <div className="text-2xl font-black text-foreground mb-0.5">{value}</div>
      <div className="text-xs font-semibold text-muted-foreground">{label}</div>
      {sub && <div className="text-xs text-muted-foreground/60 mt-0.5">{sub}</div>}
    </div>
  );
}

// ── Overview Tab ──────────────────────────────────────────────────────────

function OverviewTab({ stats, onRefresh }: { stats: Record<string, number>; onRefresh: () => void }) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  const revenueFormatted = stats.revenue
    ? stats.revenue > 999 ? `₹${(stats.revenue / 1000).toFixed(1)}k / $${(stats.revenue / 100000).toFixed(1)}k` : `${stats.revenue}`
    : '—';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Overview</h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-white/25 rounded-xl px-3 py-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Primary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <StatCard
          label="Total Applicants"
          value={stats.totalApplicants ?? 0}
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          label="Qualified"
          value={stats.qualified ?? 0}
          sub={`${stats.qualificationRate ?? 0}% pass rate`}
          color="#3FBD8B"
          icon={<CheckCircle className="w-4 h-4" />}
        />
        <StatCard
          label="Payments Done"
          value={stats.completedPayments ?? 0}
          icon={<CreditCard className="w-4 h-4" />}
        />
        <StatCard
          label="Confirmed Bookings"
          value={stats.confirmedBookings ?? 0}
          color="#3FBD8B"
          icon={<Calendar className="w-4 h-4" />}
        />
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard
          label="Revenue Collected"
          value={revenueFormatted}
          sub="all completed payments"
          color="#3FBD8B"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatCard
          label="Conversion Rate"
          value={`${stats.conversionRate ?? 0}%`}
          sub="applicant → booked"
          icon={<Activity className="w-4 h-4" />}
        />
        <StatCard
          label="Rejected"
          value={stats.rejected ?? 0}
          sub={`${stats.totalApplicants ? 100 - (stats.qualificationRate ?? 0) : 0}% of applicants`}
          color="#f59e0b"
          icon={<XCircle className="w-4 h-4" />}
        />
      </div>

      {/* Funnel visual */}
      {(stats.totalApplicants ?? 0) > 0 && (
        <div className="mt-6 bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#1f56d4]" />
            Conversion Funnel
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Applied', value: stats.totalApplicants ?? 0, color: '#1f56d4' },
              { label: 'Qualified', value: stats.qualified ?? 0, color: '#3FBD8B' },
              { label: 'Paid', value: stats.completedPayments ?? 0, color: '#a855f7' },
              { label: 'Booked', value: stats.confirmedBookings ?? 0, color: '#f59e0b' },
            ].map(({ label, value, color }) => {
              const pct = stats.totalApplicants ? Math.round((value / stats.totalApplicants) * 100) : 0;
              return (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-16 text-xs font-semibold text-muted-foreground text-right shrink-0">{label}</div>
                  <div className="flex-1 h-6 bg-white/5 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(pct, 2)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-lg flex items-center justify-end pr-2"
                      style={{ background: color }}
                    >
                      <span className="text-[10px] font-bold text-white">{value}</span>
                    </motion.div>
                  </div>
                  <div className="w-9 text-xs text-muted-foreground text-right shrink-0">{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Applicants Tab ────────────────────────────────────────────────────────

function ApplicantsTab({
  applicants, loading, onRefresh, onDelete, onPurgeAll,
}: {
  applicants: AdminApplicant[];
  loading: boolean;
  onRefresh: () => void;
  onDelete: (id: string) => Promise<void>;
  onPurgeAll: () => Promise<void>;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'qualified' | 'rejected'>('all');
  const [search, setSearch] = useState('');
  const [confirm, setConfirm] = useState<{ type: 'single'; id: string } | { type: 'purge' } | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = applicants.filter((a) => {
    const matchFilter =
      filter === 'all' ||
      (filter === 'qualified' && a.is_qualified) ||
      (filter === 'rejected' && !a.is_qualified);
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      a.full_name?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q) ||
      a.company?.toLowerCase().includes(q) ||
      a.country?.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const handleDelete = async (id: string) => {
    setDeleting(id);
    await onDelete(id);
    setDeleting(null);
    setConfirm(null);
    setExpanded(null);
  };

  const handlePurge = async () => {
    await onPurgeAll();
    setConfirm(null);
  };

  return (
    <div>
      {confirm?.type === 'single' && (
        <ConfirmDialog
          message="Delete this applicant and all their payment/booking records? This cannot be undone."
          onConfirm={() => handleDelete(confirm.id)}
          onCancel={() => setConfirm(null)}
        />
      )}
      {confirm?.type === 'purge' && (
        <ConfirmDialog
          message="Delete ALL applicants, payments, and bookings? This wipes the entire database and cannot be undone."
          onConfirm={handlePurge}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, company..."
            className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#1f56d4]/40"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2.5 bg-card border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          {applicants.length > 0 && (
            <button
              onClick={() => setConfirm({ type: 'purge' })}
              className="flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-xl text-sm text-red-400 font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Purge All
            </button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {(['all', 'qualified', 'rejected'] as const).map((f) => {
          const count =
            f === 'all' ? applicants.length :
            f === 'qualified' ? applicants.filter((a) => a.is_qualified).length :
            applicants.filter((a) => !a.is_qualified).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors ${
                filter === f
                  ? 'bg-[#1f56d4] text-white'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {f} <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-16 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" /></div>
      ) : (
        <div className="space-y-2">
          {filtered.map((a) => (
            <div key={a.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-white/15 transition-colors">
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setExpanded(expanded === a.id ? null : a.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${a.is_qualified ? 'bg-[#3FBD8B]' : 'bg-amber-400'}`} />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{a.full_name}</p>
                    <p className="text-xs text-muted-foreground truncate">{a.email} · {a.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className={`hidden sm:inline px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    a.is_qualified ? 'bg-[#3FBD8B]/15 text-[#3FBD8B]' : 'bg-amber-400/15 text-amber-400'
                  }`}>
                    {a.qualification_score}pts
                  </span>
                  {a.payment_status === 'completed' && (
                    <span className="hidden sm:inline px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#1f56d4]/15 text-[#1f56d4]">Paid</span>
                  )}
                  {a.booking_status === 'confirmed' && (
                    <span className="hidden sm:inline px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/15 text-purple-400">Booked</span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); setConfirm({ type: 'single', id: a.id }); }}
                    disabled={deleting === a.id}
                    className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                  >
                    {deleting === a.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
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
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Role / Company</p>
                        <p className="text-foreground">{a.applicant_role || '—'}{a.company ? ` · ${a.company}` : ''}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Budget · Urgency</p>
                        <p className="text-foreground">{a.budget_range} · {a.urgency}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Problem Statement</p>
                        <p className="text-foreground/80 leading-relaxed text-xs">{a.problem}</p>
                      </div>
                      {!a.is_qualified && a.rejection_reason && (
                        <div className="sm:col-span-2 bg-amber-400/8 border border-amber-400/20 rounded-xl p-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">Rejection Reason</p>
                          <p className="text-foreground/70 text-xs">{a.rejection_reason}</p>
                        </div>
                      )}
                      {a.payment_status === 'completed' && (
                        <div className="sm:col-span-2 bg-[#3FBD8B]/8 border border-[#3FBD8B]/20 rounded-xl p-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#3FBD8B] mb-1">Payment</p>
                          <p className="text-foreground/70 text-xs">
                            {a.payment_currency} {a.payment_amount} via {a.payment_provider}
                          </p>
                        </div>
                      )}
                      {a.meet_link && (
                        <div className="sm:col-span-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Meet Link</p>
                          <a href={a.meet_link} className="text-[#1f56d4] hover:underline text-xs break-all" target="_blank" rel="noreferrer">
                            {a.meet_link}
                          </a>
                        </div>
                      )}
                      <div className="sm:col-span-2 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Applied</p>
                          <p className="text-foreground/70 text-xs">{new Date(a.created_at).toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => setConfirm({ type: 'single', id: a.id })}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-xs text-red-400 font-semibold transition-colors"
                        >
                          <Trash2 className="w-3 h-3" /> Delete Record
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground text-sm">
              {search ? `No results for "${search}"` : 'No applicants yet'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Slots Tab ─────────────────────────────────────────────────────────────

type Slot = { id: string; slot_date: string; start_time: string; end_time: string; is_available: boolean };

function SlotsTab() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDate, setAddDate] = useState('');
  const [addStart, setAddStart] = useState('09:00');
  const [addEnd, setAddEnd] = useState('10:00');
  const [adding, setAdding] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null); // slotId to delete
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchSlots = useCallback(() => {
    setLoading(true);
    adminAction('slots').then((d) => setSlots(d.slots || [])).finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchSlots(); }, [fetchSlots]);

  const addSlot = async () => {
    if (!addDate) return;
    setAdding(true);
    try {
      await adminAction('add-slot', { date: addDate, startTime: addStart, endTime: addEnd });
      fetchSlots();
      setAddDate('');
    } catch { /* ignore */ }
    setAdding(false);
  };

  const toggle = async (slotId: string, current: boolean) => {
    await adminAction('toggle-slot', { slotId, isAvailable: !current });
    setSlots((s) => s.map((sl) => sl.id === slotId ? { ...sl, is_available: !current } : sl));
  };

  const deleteSlot = async (slotId: string) => {
    setDeleting(slotId);
    try {
      await adminAction('delete-slot', { slotId });
      setSlots((s) => s.filter((sl) => sl.id !== slotId));
    } catch { /* ignore */ }
    setDeleting(null);
    setConfirm(null);
  };

  // Group by date
  const byDate: Record<string, Slot[]> = {};
  slots.forEach((s) => { (byDate[s.slot_date] ??= []).push(s); });

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      {confirm && (
        <ConfirmDialog
          message="Delete this slot? This cannot be undone."
          onConfirm={() => deleteSlot(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* Add slot */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#1f56d4]" /> Add Availability Slot
        </h3>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Date</label>
            <input type="date" value={addDate} min={today} onChange={(e) => setAddDate(e.target.value)}
              className="bg-background border border-border rounded-xl px-3 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#1f56d4]/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Start</label>
            <input type="time" value={addStart} onChange={(e) => setAddStart(e.target.value)}
              className="bg-background border border-border rounded-xl px-3 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#1f56d4]/50" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1.5">End</label>
            <input type="time" value={addEnd} onChange={(e) => setAddEnd(e.target.value)}
              className="bg-background border border-border rounded-xl px-3 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#1f56d4]/50" />
          </div>
          <div className="flex gap-2">
            <button onClick={addSlot} disabled={adding || !addDate}
              className="px-5 py-2.5 bg-[#1f56d4] hover:bg-[#1a47b8] disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
              {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add
            </button>
            <button onClick={fetchSlots} className="p-2.5 bg-card border border-border hover:border-white/25 text-muted-foreground rounded-xl transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slot list */}
      {loading ? (
        <div className="py-12 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-muted-foreground" /></div>
      ) : (
        <div className="space-y-3">
          {Object.entries(byDate).sort(([a], [b]) => a.localeCompare(b)).map(([date, dateSlots]) => (
            <div key={date} className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#1f56d4]" />
                {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                <span className="text-[10px] text-muted-foreground font-normal">({dateSlots.length} slot{dateSlots.length !== 1 ? 's' : ''})</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {dateSlots.map((s) => (
                  <div key={s.id} className="flex items-center gap-1">
                    <button
                      onClick={() => toggle(s.id, s.is_available)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        s.is_available
                          ? 'bg-[#3FBD8B]/15 text-[#3FBD8B] border border-[#3FBD8B]/30 hover:bg-[#3FBD8B]/25'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                      }`}>
                      {s.start_time.slice(0, 5)} {s.is_available ? '✓' : '✗'}
                    </button>
                    <button
                      onClick={() => setConfirm(s.id)}
                      disabled={deleting === s.id}
                      className="p-1 text-muted-foreground/40 hover:text-red-400 transition-colors"
                    >
                      {deleting === s.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(byDate).length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No slots configured. Add availability above so clients can book.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Settings Tab ──────────────────────────────────────────────────────────

const SETTING_FIELDS = [
  {
    key: 'consultation_fee_inr',
    label: 'Consultation Fee (India)',
    prefix: '₹',
    icon: <IndianRupee className="w-4 h-4" />,
    description: 'Fee charged to Indian clients (INR) for the strategy session',
    defaultVal: 1999,
  },
  {
    key: 'consultation_fee_usd',
    label: 'Consultation Fee (International)',
    prefix: '$',
    icon: <DollarSign className="w-4 h-4" />,
    description: 'Fee charged to international clients (USD)',
    defaultVal: 199,
  },
  {
    key: 'budget_threshold_inr',
    label: 'Min Qualifying Budget (India)',
    prefix: '₹',
    icon: <IndianRupee className="w-4 h-4" />,
    description: 'Applicants with a budget below this INR value are auto-rejected',
    defaultVal: 75000,
  },
  {
    key: 'budget_threshold_usd',
    label: 'Min Qualifying Budget (International)',
    prefix: '$',
    icon: <DollarSign className="w-4 h-4" />,
    description: 'Applicants with a budget below this USD value are auto-rejected',
    defaultVal: 1000,
  },
  {
    key: 'session_duration_minutes',
    label: 'Session Duration',
    prefix: '',
    suffix: 'min',
    icon: <Clock className="w-4 h-4" />,
    description: 'Length of each consultation session in minutes',
    defaultVal: 60,
  },
];

function SettingsTab() {
  const [settings, setSettings] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminAction('settings').then((d) => {
      const parsed: Record<string, number> = {};
      Object.entries(d.settings || {}).forEach(([k, v]) => { parsed[k] = Number(v); });
      // Fill defaults for any missing keys
      SETTING_FIELDS.forEach(({ key, defaultVal }) => {
        if (!(key in parsed)) parsed[key] = defaultVal;
      });
      setSettings(parsed);
    }).finally(() => setLoading(false));
  }, []);

  const save = async (key: string) => {
    setSaving(key);
    setError(null);
    try {
      await adminAction('update-setting', { key, value: settings[key] });
      setSaved(key);
      setTimeout(() => setSaved(null), 2500);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(null);
    }
  };

  if (loading) return (
    <div className="py-16 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-muted-foreground" /></div>
  );

  return (
    <div>
      <div className="mb-6 p-4 bg-[#1f56d4]/8 border border-[#1f56d4]/20 rounded-xl text-sm text-foreground/70 flex items-start gap-3">
        <Activity className="w-4 h-4 text-[#1f56d4] shrink-0 mt-0.5" />
        <span>Changes take effect immediately for all new visitors. Consultation fee changes are live on the next page load.</span>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-400/10 border border-red-400/20 rounded-xl text-sm text-red-400 flex items-center gap-2">
          <XCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      <div className="space-y-3 max-w-xl">
        {SETTING_FIELDS.map(({ key, label, prefix, suffix, icon, description, defaultVal }) => (
          <div key={key} className="bg-card border border-border rounded-xl p-5 hover:border-white/15 transition-colors">
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[#1f56d4]">{icon}</span>
                <label className="text-sm font-bold text-foreground">{label}</label>
              </div>
              <span className="text-[10px] text-muted-foreground/50 font-mono">default: {prefix}{defaultVal}{suffix}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3 ml-6">{description}</p>
            <div className="flex gap-3 ml-6">
              <div className="relative flex-1">
                {prefix && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">{prefix}</span>
                )}
                <input
                  type="number"
                  value={settings[key] ?? defaultVal}
                  onChange={(e) => setSettings((s) => ({ ...s, [key]: Number(e.target.value) }))}
                  className={`w-full bg-background border border-border rounded-xl py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#1f56d4]/50 ${prefix ? 'pl-7 pr-4' : 'px-4'}`}
                />
                {suffix && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">{suffix}</span>
                )}
              </div>
              <button
                onClick={() => save(key)}
                disabled={saving === key}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all min-w-[72px] flex items-center justify-center gap-1.5 ${
                  saved === key
                    ? 'bg-[#3FBD8B]/20 border border-[#3FBD8B]/30 text-[#3FBD8B]'
                    : 'bg-[#1f56d4] hover:bg-[#1a47b8] disabled:opacity-50 text-white'
                }`}
              >
                {saving === key
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : saved === key
                    ? <><CheckCircle className="w-3.5 h-3.5" /> Saved</>
                    : 'Save'
                }
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Client Forge Feature Showcase ────────────────────────────────────────

const CLIENT_FORGE_URL = 'https://clientforge.theripplenexus.com/';

const CF_FEATURES = [
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Client Onboarding',
    desc: 'Structured onboarding flows that collect everything you need from new clients — requirements, assets, approvals — in one place.',
    color: '#1f56d4',
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: 'Invoicing & Payments',
    desc: 'Generate professional invoices, track payment status, and send reminders automatically. INR and USD supported.',
    color: '#3FBD8B',
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: 'Project Deliverables',
    desc: 'Organise draft and final deliverables per project. Clients review, approve, or request revisions directly in the portal.',
    color: '#a855f7',
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: 'Requirements Collection',
    desc: 'Smart intake forms that capture technical and business requirements before a project kicks off — no back-and-forth emails.',
    color: '#f59e0b',
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: 'Approval Workflows',
    desc: 'Send deliverables for sign-off. Track which clients have approved, what is pending, and what needs revision at a glance.',
    color: '#3FBD8B',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Timeline & Milestones',
    desc: 'Set project milestones and keep clients informed of progress without manual status update emails.',
    color: '#1f56d4',
  },
];

function ClientForgeTab() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#1f56d4]/10 border border-[#1f56d4]/25 rounded-2xl flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6 text-[#1f56d4]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Client Forge</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Your end-to-end client operations platform
            </p>
          </div>
        </div>
        <a
          href={CLIENT_FORGE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#1f56d4] hover:bg-[#1a47b8] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-[#1f56d4]/20 shrink-0"
        >
          <ExternalLink className="w-4 h-4" />
          Open Client Forge
        </a>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {CF_FEATURES.map(({ icon, title, desc, color }) => (
          <div
            key={title}
            className="bg-card border border-border rounded-2xl p-5 hover:border-white/15 transition-colors"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
            >
              {icon}
            </div>
            <h3 className="text-sm font-bold text-foreground mb-1.5">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* CTA banner */}
      <div className="rounded-2xl border border-[#1f56d4]/25 bg-[#1f56d4]/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-foreground mb-1">Ready to manage your clients?</p>
          <p className="text-xs text-muted-foreground">All client operations in one place — onboarding, invoicing, deliverables, and approvals.</p>
        </div>
        <a
          href={CLIENT_FORGE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#1f56d4] hover:bg-[#1a47b8] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Launch Client Forge
        </a>
      </div>
    </div>
  );
}

// ── Main Admin Dashboard ──────────────────────────────────────────────────

type Tab = 'overview' | 'applicants' | 'slots' | 'settings' | 'clientforge';

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('overview');
  const [stats, setStats] = useState<Record<string, number>>({});
  const [applicants, setApplicants] = useState<AdminApplicant[]>([]);
  const [applicantsLoading, setApplicantsLoading] = useState(false);

  const loadStats = useCallback(async () => {
    const d = await adminAction('stats').catch(() => ({}));
    setStats(d);
  }, []);

  const loadApplicants = useCallback(async () => {
    setApplicantsLoading(true);
    const d = await adminAction('applicants').catch(() => ({ applicants: [] }));
    setApplicants(d.applicants || []);
    setApplicantsLoading(false);
  }, []);

  // Check existing token on mount
  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    adminAction('stats').then((d) => {
      setStats(d);
      setAuthed(true);
    }).catch(() => {
      clearToken();
    }).finally(() => setLoading(false));
  }, []);

  // Load data when tab changes
  useEffect(() => {
    if (!authed) return;
    if (tab === 'applicants') loadApplicants();
  }, [authed, tab, loadApplicants]);

  const onLogin = async () => {
    setAuthed(true);
    await loadStats();
  };

  const handleDeleteApplicant = async (id: string) => {
    await adminAction('delete-applicant', { applicantId: id });
    setApplicants((a) => a.filter((x) => x.id !== id));
    await loadStats();
  };

  const handlePurgeAll = async () => {
    await adminAction('purge-all-records');
    setApplicants([]);
    await loadStats();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f56d4]" />
      </div>
    );
  }

  const seoTitle = 'RNS Admin: Ripple Nexus Scheduler Dashboard';

  if (!authed) return (
    <>
      <SEOHead title={seoTitle} description="" />
      <LoginScreen onLogin={onLogin} />
    </>
  );

  const TABS: { key: Tab; label: string; icon: React.ReactNode; badge?: number; highlight?: boolean }[] = [
    { key: 'overview',     label: 'Overview',      icon: <BarChart3 className="w-4 h-4" /> },
    { key: 'applicants',   label: 'Applicants',    icon: <Users className="w-4 h-4" />, badge: stats.totalApplicants },
    { key: 'slots',        label: 'Slots',         icon: <Calendar className="w-4 h-4" /> },
    { key: 'settings',     label: 'Settings',      icon: <Settings className="w-4 h-4" /> },
    { key: 'clientforge',  label: 'Client Forge',  icon: <Briefcase className="w-4 h-4" />, highlight: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title={seoTitle} description="" />
      {/* Top bar */}
      <div className="border-b border-border bg-card/50 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1f56d4]/10 border border-[#1f56d4]/30 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#1f56d4]" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground leading-none">RNS Admin</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">Ripple Nexus Scheduler</p>
            </div>
          </div>
          <button
            onClick={() => { clearToken(); setAuthed(false); }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-white/20 rounded-xl px-3 py-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </div>

      {/* Tab nav */}
      <div className="border-b border-border bg-card/20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map(({ key, label, icon, badge, highlight }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap relative ${
                  tab === key
                    ? 'border-[#1f56d4] text-[#1f56d4]'
                    : highlight
                      ? 'border-transparent text-[#3FBD8B] hover:text-[#3FBD8B]/80'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {icon}
                {label}
                {badge != null && badge > 0 && (
                  <span className="ml-1 text-[10px] bg-[#1f56d4]/15 text-[#1f56d4] font-bold px-1.5 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
                {highlight && tab !== key && (
                  <span className="ml-1 text-[9px] bg-[#3FBD8B]/15 text-[#3FBD8B] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                    New
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content — ClientForge is full-bleed; all other tabs use padded container */}
      <AnimatePresence mode="wait">
        {tab === 'clientforge' ? (
          <motion.div key="clientforge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ClientForgeTab />
          </motion.div>
        ) : (
          <motion.div key="padded" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              {tab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <OverviewTab stats={stats} onRefresh={loadStats} />
                </motion.div>
              )}

              {tab === 'applicants' && (
                <motion.div key="applicants" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#1f56d4]" /> Applicants
                    </h2>
                  </div>
                  <ApplicantsTab
                    applicants={applicants}
                    loading={applicantsLoading}
                    onRefresh={loadApplicants}
                    onDelete={handleDeleteApplicant}
                    onPurgeAll={handlePurgeAll}
                  />
                </motion.div>
              )}

              {tab === 'slots' && (
                <motion.div key="slots" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-6">
                    <Calendar className="w-5 h-5 text-[#1f56d4]" /> Availability Slots
                  </h2>
                  <SlotsTab />
                </motion.div>
              )}

              {tab === 'settings' && (
                <motion.div key="settings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-[#1f56d4]" /> Qualification & Pricing Settings
                  </h2>
                  <SettingsTab />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
