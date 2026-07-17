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
  BarChart3, RefreshCw, Trash2, AlertTriangle, Search, Clock, Activity, Shield, Briefcase, ExternalLink, Download, Database,
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Leads Overview</h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-white/25 rounded-xl px-3 py-2"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        <StatCard
          label="Total Leads"
          value={stats.totalLeads ?? 0}
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          label="Qualified Leads"
          value={stats.qualifiedLeads ?? 0}
          color="#10b981"
          icon={<CheckCircle className="w-4 h-4" />}
          sub="Priority >= 60"
        />
        <StatCard
          label="Upcoming Bookings"
          value={stats.upcomingBookings ?? 0}
          color="#3FBD8B"
          icon={<Calendar className="w-4 h-4" />}
        />
        <StatCard
          label="High Budget Leads"
          value={stats.highBudgetLeads ?? 0}
          color="#a855f7"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatCard
          label="Decision Makers"
          value={stats.decisionMakers ?? 0}
          color="#f59e0b"
          icon={<Shield className="w-4 h-4" />}
        />
        <StatCard
          label="Leads This Week"
          value={stats.leadsThisWeek ?? 0}
          color="#06b6d4"
          icon={<Activity className="w-4 h-4" />}
        />
      </div>
    </div>
  );
}

// ── Leads Tab ─────────────────────────────────────────────────────────────

type Lead = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  business_website: string;
  business_stage: string;
  primary_challenge: string;
  budget_range: string;
  timeline: string;
  project_description: string;
  created_at: string;
};

function LeadsTab({
  leads, loading, onRefresh, onDelete
}: {
  leads: Lead[];
  loading: boolean;
  onRefresh: () => void;
  onDelete: (id: string) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [confirm, setConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = leads.filter(l => 
    !search || 
    l.full_name?.toLowerCase().includes(search.toLowerCase()) || 
    l.email?.toLowerCase().includes(search.toLowerCase()) ||
    l.company_name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    setDeleting(id);
    await onDelete(id);
    setDeleting(null);
    setConfirm(null);
    setExpanded(null);
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Company', 'Website', 'Stage', 'Challenge', 'Budget', 'Timeline', 'Description'];
    const rows = leads.map(l => [
      new Date(l.created_at).toLocaleString(),
      `"${(l.full_name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.company_name || '').replace(/"/g, '""')}"`,
      `"${(l.business_website || '').replace(/"/g, '""')}"`,
      `"${(l.business_stage || '').replace(/"/g, '""')}"`,
      `"${(l.primary_challenge || '').replace(/"/g, '""')}"`,
      `"${(l.budget_range || '').replace(/"/g, '""')}"`,
      `"${(l.timeline || '').replace(/"/g, '""')}"`,
      `"${(l.project_description || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rns_leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {confirm && (
        <ConfirmDialog
          message="Delete this lead? This cannot be undone."
          onConfirm={() => handleDelete(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#1f56d4]/40"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={onRefresh} disabled={loading} className="px-3 py-2.5 bg-card border border-border rounded-xl text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-[#3FBD8B] hover:bg-[#34a275] text-white font-bold rounded-xl text-sm transition-colors">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" /></div>
      ) : (
        <div className="space-y-2">
          {filtered.map(l => (
            <div key={l.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-white/15 transition-colors">
              <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpanded(expanded === l.id ? null : l.id)}>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{l.full_name}</p>
                  <p className="text-xs text-muted-foreground truncate">{l.email} · {l.company_name}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="hidden sm:inline px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#1f56d4]/15 text-[#1f56d4]">L-{l.id.substring(0,8).toUpperCase()}</span>
                  <span className="hidden sm:inline text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</span>
                  <button onClick={(e) => { e.stopPropagation(); setConfirm(l.id); }} disabled={deleting === l.id} className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10">
                    {deleting === l.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                  {expanded === l.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>
              <AnimatePresence>
                {expanded === l.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-border overflow-hidden">
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Challenge</p>
                        <p className="text-foreground">{l.primary_challenge || '—'}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Budget · Timeline</p>
                        <p className="text-foreground">{l.budget_range} · {l.timeline}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Description</p>
                        <p className="text-foreground/80 leading-relaxed text-xs">{l.project_description || '—'}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground text-sm">
              No leads found.
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

// Removed Settings Tab

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

// ── Bookings Tab ──────────────────────────────────────────────────────────

type Booking = {
  id: string;
  slot_date: string;
  slot_start_time: string;
  status: string;
  client_timezone: string;
  meet_link: string;
  created_at: string;
  rns_leads?: { full_name: string; email: string; company_name: string };
};

function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(() => {
    setLoading(true);
    adminAction('bookings').then(d => setBookings(d.bookings || [])).finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#3FBD8B]" /> Consultations
        </h2>
        <button onClick={fetchBookings} disabled={loading} className="px-3 py-2 bg-card border border-border rounded-xl text-muted-foreground hover:text-foreground transition-colors">
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-muted-foreground" /></div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">No bookings yet.</div>
      ) : (
        <div className="space-y-3">
          {bookings.map(b => (
            <div key={b.id} className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="font-bold text-foreground text-sm mb-1">{b.rns_leads?.full_name} <span className="text-muted-foreground font-normal">({b.rns_leads?.company_name})</span></p>
                <p className="text-xs text-muted-foreground mb-2">{b.rns_leads?.email}</p>
                <div className="flex gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1f56d4]/15 text-[#1f56d4]">
                    {new Date(b.slot_date).toLocaleDateString()} at {b.slot_start_time.substring(0,5)}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${b.status === 'confirmed' ? 'bg-[#3FBD8B]/15 text-[#3FBD8B]' : 'bg-muted text-muted-foreground'}`}>
                    {b.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center gap-2">
                {b.meet_link ? (
                  <a href={b.meet_link} target="_blank" rel="noreferrer" className="text-xs text-[#1f56d4] font-semibold hover:underline">Join Google Meet</a>
                ) : (
                  <span className="text-xs text-muted-foreground">No Meet Link</span>
                )}
                <span className="text-[10px] text-muted-foreground">Timezone: {b.client_timezone}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Admin Dashboard ──────────────────────────────────────────────────

type Tab = 'overview' | 'leads' | 'slots' | 'bookings' | 'clientforge';

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('overview');
  const [stats, setStats] = useState<Record<string, number>>({});
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  const loadStats = useCallback(async () => {
    const d = await adminAction('stats').catch(() => ({}));
    setStats(d);
  }, []);

  const loadLeads = useCallback(async () => {
    setLeadsLoading(true);
    const d = await adminAction('leads').catch(() => ({ leads: [] }));
    setLeads(d.leads || []);
    setLeadsLoading(false);
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
    if (tab === 'leads') loadLeads();
  }, [authed, tab, loadLeads]);

  const onLogin = async () => {
    setAuthed(true);
    await loadStats();
  };

  const handleDeleteLead = async (id: string) => {
    await adminAction('delete-lead', { leadId: id });
    setLeads((l) => l.filter((x) => x.id !== id));
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
    { key: 'leads',        label: 'Leads',         icon: <Database className="w-4 h-4" />, badge: stats.totalLeads },
    { key: 'bookings',     label: 'Bookings',      icon: <Calendar className="w-4 h-4" />, badge: stats.upcomingBookings },
    { key: 'slots',        label: 'Availability',  icon: <Clock className="w-4 h-4" /> },
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

              {tab === 'leads' && (
                <motion.div key="leads" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Database className="w-5 h-5 text-[#1f56d4]" /> Project Leads
                    </h2>
                  </div>
                  <LeadsTab
                    leads={leads}
                    loading={leadsLoading}
                    onRefresh={loadLeads}
                    onDelete={handleDeleteLead}
                  />
                </motion.div>
              )}

              {tab === 'bookings' && (
                <motion.div key="bookings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <BookingsTab />
                </motion.div>
              )}

              {tab === 'slots' && (
                <motion.div key="slots" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <SlotsTab />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
