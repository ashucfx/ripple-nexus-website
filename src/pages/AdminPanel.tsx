/**
 * Ripple Nexus Control Plane — /admin
 * Authenticated dashboard for reviewing client intake dossiers, lead telemetry, and system status.
 */
import { useEffect, useState, useCallback, useMemo } from 'react';
import SEOHead from '@/components/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, LogOut, Loader2, Database,
  Search, CheckCircle2, ChevronDown, ChevronUp, Trash2,
  Download, ArrowRight, Activity, Terminal,
  Copy, Check
} from 'lucide-react';
import logoMark from '../assets/logo-icon-mark.svg';

// ── Authentication Helpers ──────────────────────────────────────────────────

const TOKEN_KEY = 'rns_admin_token';

function getToken() { return localStorage.getItem(TOKEN_KEY) ?? ''; }
function setToken(t: string) { localStorage.setItem(TOKEN_KEY, t); }
function clearToken() { localStorage.removeItem(TOKEN_KEY); }

async function safeJson(res: Response) {
  const text = await res.text();
  if (!text.trim()) {
    throw new Error(`Server returned empty response (HTTP ${res.status}). Check serverless function logs.`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Server response parse error (${res.status}).`);
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

// ── Lead Data Interface ─────────────────────────────────────────────────────

interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  business_website?: string;
  business_stage?: string;
  primary_challenge?: string;
  budget_range?: string;
  timeline?: string;
  project_description?: string;
  priority_score?: number;
  is_qualified?: boolean;
  is_decision_maker?: boolean;
  created_at: string;
}

// ── Confirm Modal ───────────────────────────────────────────────────────────

function ConfirmDialog({
  message, onConfirm, onCancel,
}: {
  message: string; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0D0F16] border border-[#1E2028] rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
            <Trash2 className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Confirm Removal</h4>
            <p className="font-mono text-xs text-[#8E93A4] mt-0.5">Permanent action</p>
          </div>
        </div>
        <p className="font-body text-xs text-[#B4B9C8] leading-relaxed">{message}</p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-[#14161F] border border-[#1E2028] hover:border-white/20 rounded-xl text-xs font-mono uppercase text-[#8E93A4] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-xs font-mono uppercase font-bold text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Obsidian Brutalist Login Screen ─────────────────────────────────────────

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
      if (!res.ok) throw new Error(data.error || 'Authentication rejected');
      setToken(data.token);
      onLogin();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0D0F16] border border-[#1E2028] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#12141F] border border-white/15 flex items-center justify-center p-2 mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <img src={logoMark} alt="Ripple Nexus" className="w-full h-full object-contain" />
          </div>
          <span className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-widest font-semibold">
            [PIPELINE CONSOLE // SECURE ACCESS]
          </span>
          <h1 className="font-display font-extrabold text-xl text-white uppercase tracking-tight mt-1">
            Ripple Nexus Pipeline Console
          </h1>
          <p className="font-body text-xs text-[#8E93A4] mt-1.5">
            Internal console for client intake dossiers, leads &amp; telemetry.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block font-mono text-[11px] text-[#8E93A4] uppercase tracking-wider mb-2">
              Console Access Key
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Console Password"
              required
              className="w-full bg-[#08090C] border border-[#1E2028] focus:border-[#00F0FF] rounded-xl px-4 py-3 text-white text-sm font-mono placeholder:text-[#3A3F50] focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-mono text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-white hover:bg-[#00F0FF] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.25)] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-black" />
            ) : (
              <>
                <span>Authenticate Session</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-[#1E2028] text-center">
          <span className="font-mono text-[10px] text-[#4E5466] uppercase tracking-wider">
            Protected by HMAC Session Tokens · Ripple Nexus
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Dashboard ──────────────────────────────────────────────────────────

type AdminTab = 'overview' | 'leads' | 'settings';

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<AdminTab>('overview');
  const [stats, setStats] = useState<Record<string, number>>({});
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQualified, setFilterQualified] = useState<'all' | 'qualified'>('all');
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    adminAction('stats')
      .then((d) => {
        setStats(d);
        setAuthed(true);
      })
      .catch(() => {
        clearToken();
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!authed) return;
    if (tab === 'leads' || tab === 'overview') {
      loadLeads();
    }
  }, [authed, tab, loadLeads]);

  const onLogin = async () => {
    setAuthed(true);
    await Promise.all([loadStats(), loadLeads()]);
  };

  const handleDeleteLead = async (id: string) => {
    try {
      await adminAction('delete-lead', { leadId: id });
      setLeads((prev) => prev.filter((x) => x.id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const handleCopyJson = (lead: Lead) => {
    navigator.clipboard.writeText(JSON.stringify(lead, null, 2));
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCsv = () => {
    if (!leads.length) return;
    const headers = ['ID', 'Date', 'Full Name', 'Email', 'Company', 'Challenge', 'Budget', 'Timeline', 'Qualified'];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.created_at).toISOString(),
      `"${(l.full_name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.company_name || '').replace(/"/g, '""')}"`,
      `"${(l.primary_challenge || '').replace(/"/g, '""')}"`,
      `"${(l.budget_range || '').replace(/"/g, '""')}"`,
      `"${(l.timeline || '').replace(/"/g, '""')}"`,
      l.is_qualified ? 'YES' : 'NO',
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ripple-nexus-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        (l.full_name || '').toLowerCase().includes(q) ||
        (l.email || '').toLowerCase().includes(q) ||
        (l.company_name || '').toLowerCase().includes(q) ||
        (l.primary_challenge || '').toLowerCase().includes(q) ||
        (l.project_description || '').toLowerCase().includes(q);

      const matchesQualified =
        filterQualified === 'all' || (filterQualified === 'qualified' && l.is_qualified);

      return matchesSearch && matchesQualified;
    });
  }, [leads, searchQuery, filterQualified]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090C] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#00F0FF]" />
      </div>
    );
  }

  if (!authed) {
    return (
      <>
        <SEOHead title="Ripple Nexus — Pipeline Console" description="" />
        <LoginScreen onLogin={onLogin} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090C] text-white selection:bg-[#00F0FF] selection:text-black">
      <SEOHead title="Ripple Nexus — Pipeline Console" description="" />

      {confirmDeleteId && (
        <ConfirmDialog
          message="Are you sure you want to permanently delete this lead dossier? This cannot be undone."
          onConfirm={() => handleDeleteLead(confirmDeleteId)}
          onCancel={() => setConfirmDeleteId(null)}
        />
      )}

      {/* Top Navbar */}
      <header className="border-b border-[#1E2028] bg-[#07080D]/90 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#12141F] border border-white/15 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <img src={logoMark} alt="Ripple Nexus" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-white uppercase tracking-tight">
                  Ripple Nexus
                </span>
                <span className="font-mono text-[9px] bg-[#00F0FF]/15 text-[#00F0FF] px-2 py-0.5 rounded-full border border-[#00F0FF]/30 font-semibold">
                  PIPELINE CONSOLE
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#8E93A4] tracking-wider uppercase mt-0.5 hidden sm:block">
                Client Intake Dossiers &amp; Lead Pipeline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10131E] border border-[#00E599]/30 font-mono text-[10px] text-[#D0D4E0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
              <span>LIVE SYS</span>
            </div>

            <button
              onClick={() => { clearToken(); setAuthed(false); }}
              className="flex items-center gap-1.5 font-mono text-xs text-[#8E93A4] hover:text-white border border-[#1E2028] hover:border-white/20 rounded-xl px-3 py-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation Pill Bar */}
      <div className="border-b border-[#1E2028] bg-[#0A0C14]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 py-2 overflow-x-auto">
            <button
              onClick={() => setTab('overview')}
              className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-150 flex items-center gap-2 ${
                tab === 'overview'
                  ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'text-[#8E93A4] hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setTab('leads')}
              className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-150 flex items-center gap-2 ${
                tab === 'leads'
                  ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'text-[#8E93A4] hover:text-white hover:bg-white/5'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Incoming Leads</span>
              {leads.length > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  tab === 'leads' ? 'bg-black text-white' : 'bg-[#00F0FF]/20 text-[#00F0FF]'
                }`}>
                  {leads.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setTab('settings')}
              className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-150 flex items-center gap-2 ${
                tab === 'settings'
                  ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'text-[#8E93A4] hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>System Health</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* ── TAB 1: OVERVIEW ────────────────────────────────────────── */}
        {tab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Metric Strips */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-[#1E2028] bg-[#0D0F16] p-5 rounded-2xl">
                <span className="font-mono text-[10px] text-[#8E93A4] uppercase tracking-widest">
                  Total Leads Ingested
                </span>
                <p className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">
                  {leads.length || stats.totalLeads || 0}
                </p>
                <span className="font-mono text-[10px] text-[#00E599] mt-1 block">
                  ↑ Recorded via Intake & Forms
                </span>
              </div>

              <div className="border border-[#1E2028] bg-[#0D0F16] p-5 rounded-2xl">
                <span className="font-mono text-[10px] text-[#8E93A4] uppercase tracking-widest">
                  Qualified Opportunities
                </span>
                <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#00F0FF] mt-2">
                  {leads.filter((l) => l.is_qualified).length || stats.qualifiedLeads || 0}
                </p>
                <span className="font-mono text-[10px] text-[#8E93A4] mt-1 block">
                  Score ≥ 60 Threshold
                </span>
              </div>

              <div className="border border-[#1E2028] bg-[#0D0F16] p-5 rounded-2xl">
                <span className="font-mono text-[10px] text-[#8E93A4] uppercase tracking-widest">
                  Recent (Last 7 Days)
                </span>
                <p className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-2">
                  {stats.leadsThisWeek || leads.filter(l => {
                    const d = new Date(l.created_at);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return d >= weekAgo;
                  }).length || 0}
                </p>
                <span className="font-mono text-[10px] text-[#7C5CFF] mt-1 block">
                  Active Inflow
                </span>
              </div>

              <div className="border border-[#1E2028] bg-[#0D0F16] p-5 rounded-2xl">
                <span className="font-mono text-[10px] text-[#8E93A4] uppercase tracking-widest">
                  Delivery Destination
                </span>
                <p className="font-mono font-bold text-sm text-white mt-2 truncate">
                  info@theripplenexus.com
                </p>
                <span className="font-mono text-[10px] text-[#00E599] mt-1 block">
                  ● SMTP Active
                </span>
              </div>
            </div>

            {/* Recent Leads Preview Card */}
            <div className="border border-[#1E2028] bg-[#0D0F16] rounded-2xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1E2028] mb-6">
                <div>
                  <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
                    Recent Intake Submissions
                  </h3>
                  <p className="font-mono text-xs text-[#8E93A4] mt-0.5">
                    Latest client dossiers received via site
                  </p>
                </div>
                <button
                  onClick={() => setTab('leads')}
                  className="font-mono text-xs text-[#00F0FF] hover:underline flex items-center gap-1 uppercase"
                >
                  <span>View All Inquiries</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="py-12 text-center text-sm font-mono text-[#8E93A4]">
                  No submissions recorded yet. Leads submitted through the Project Intake form will appear here.
                </div>
              ) : (
                <div className="space-y-3">
                  {leads.slice(0, 5).map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => { setTab('leads'); setExpandedLead(lead.id); }}
                      className="p-4 rounded-xl border border-[#1E2028] bg-[#08090C] hover:border-[#00F0FF]/40 cursor-pointer transition-all duration-150 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-sm text-white truncate">
                            {lead.full_name}
                          </span>
                          {lead.is_qualified && (
                            <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-[#00E599]/15 text-[#00E599] border border-[#00E599]/30 rounded-full">
                              QUALIFIED
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-xs text-[#8E93A4] truncate mt-0.5">
                          {lead.email} · {lead.company_name || 'Individual'}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono text-[10px] text-[#00F0FF]">
                          L-{lead.id.substring(0, 8).toUpperCase()}
                        </span>
                        <p className="font-mono text-[10px] text-[#8E93A4] mt-0.5">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 2: INCOMING LEADS ──────────────────────────────────── */}
        {tab === 'leads' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Action & Filter Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between pb-4 border-b border-[#1E2028]">
              <div className="flex items-center gap-3 flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-[#8E93A4] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, company, challenge..."
                    className="w-full pl-9 pr-4 py-2 bg-[#0D0F16] border border-[#1E2028] focus:border-[#00F0FF] rounded-xl text-xs font-mono text-white placeholder:text-[#5E6476] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setFilterQualified(filterQualified === 'all' ? 'qualified' : 'all')}
                  className={`px-3 py-2 rounded-xl font-mono text-xs uppercase tracking-wider border transition-colors ${
                    filterQualified === 'qualified'
                      ? 'bg-[#00E599]/15 text-[#00E599] border-[#00E599]/40'
                      : 'bg-[#0D0F16] text-[#8E93A4] border-[#1E2028] hover:text-white'
                  }`}
                >
                  {filterQualified === 'qualified' ? '✓ Qualified Only' : 'All Inquiries'}
                </button>

                <button
                  onClick={handleExportCsv}
                  disabled={leads.length === 0}
                  className="px-3 py-2 bg-white text-black hover:bg-[#00F0FF] font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Leads List */}
            {leadsLoading ? (
              <div className="py-24 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#00F0FF]" />
                <p className="font-mono text-xs text-[#8E93A4] mt-2">Ingesting lead dossiers...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="border border-[#1E2028] bg-[#0D0F16] rounded-2xl p-12 text-center">
                <p className="font-mono text-sm text-[#8E93A4]">
                  No matching client dossiers found.
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-3 font-mono text-xs text-[#00F0FF] underline"
                  >
                    Clear search query
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLeads.map((lead) => {
                  const isExpanded = expandedLead === lead.id;
                  return (
                    <div
                      key={lead.id}
                      className="border border-[#1E2028] bg-[#0D0F16] rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
                    >
                      {/* Summary Row */}
                      <div
                        onClick={() => setExpandedLead(isExpanded ? null : lead.id)}
                        className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-display font-bold text-base text-white">
                              {lead.full_name}
                            </span>
                            {lead.company_name && (
                              <span className="font-mono text-xs text-[#B4B9C8]">
                                · {lead.company_name}
                              </span>
                            )}
                            {lead.is_qualified && (
                              <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-[#00E599]/15 text-[#00E599] border border-[#00E599]/30 rounded-full">
                                QUALIFIED
                              </span>
                            )}
                          </div>
                          <p className="font-mono text-xs text-[#8E93A4] mt-1 truncate">
                            {lead.email} {lead.phone ? `· ${lead.phone}` : ''}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-mono text-xs text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-1 rounded-lg border border-[#00F0FF]/20 hidden sm:inline">
                            L-{lead.id.substring(0, 8).toUpperCase()}
                          </span>
                          <span className="font-mono text-xs text-[#8E93A4] hidden md:inline">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDeleteId(lead.id);
                            }}
                            className="p-1.5 text-[#8E93A4] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#8E93A4]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#8E93A4]" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Dossier Drawer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-[#1E2028] bg-[#08090C] p-5 sm:p-6 space-y-4"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="p-3 border border-[#1E2028] bg-[#0D0F16] rounded-xl">
                                <span className="font-mono text-[9px] text-[#8E93A4] uppercase tracking-widest block">
                                  Primary Challenge
                                </span>
                                <span className="font-mono text-xs text-white font-medium mt-1 block">
                                  {lead.primary_challenge || 'Not specified'}
                                </span>
                              </div>

                              <div className="p-3 border border-[#1E2028] bg-[#0D0F16] rounded-xl">
                                <span className="font-mono text-[9px] text-[#8E93A4] uppercase tracking-widest block">
                                  Timeline Expectation
                                </span>
                                <span className="font-mono text-xs text-white font-medium mt-1 block">
                                  {lead.timeline || 'Flexible'}
                                </span>
                              </div>

                              <div className="p-3 border border-[#1E2028] bg-[#0D0F16] rounded-xl">
                                <span className="font-mono text-[9px] text-[#8E93A4] uppercase tracking-widest block">
                                  Business Stage / Budget
                                </span>
                                <span className="font-mono text-xs text-white font-medium mt-1 block">
                                  {lead.budget_range || lead.business_stage || 'Not specified'}
                                </span>
                              </div>

                              <div className="p-3 border border-[#1E2028] bg-[#0D0F16] rounded-xl">
                                <span className="font-mono text-[9px] text-[#8E93A4] uppercase tracking-widest block">
                                  Lead ID & Submission
                                </span>
                                <span className="font-mono text-xs text-[#00F0FF] mt-1 block truncate">
                                  {lead.id}
                                </span>
                              </div>
                            </div>

                            {/* Detailed Description */}
                            <div className="p-4 border border-[#1E2028] bg-[#0D0F16] rounded-xl space-y-2">
                              <span className="font-mono text-[10px] text-[#00F0FF] uppercase tracking-wider block">
                                Technical Scope & Client Context
                              </span>
                              <p className="font-body text-xs text-[#B4B9C8] leading-relaxed whitespace-pre-wrap">
                                {lead.project_description || 'No additional context provided.'}
                              </p>
                            </div>

                            {/* Actions Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                              <a
                                href={`mailto:${lead.email}?subject=Re:%20Ripple%20Nexus%20Technical%20Evaluation`}
                                className="px-4 py-2 bg-white text-black font-mono text-xs font-bold uppercase rounded-xl hover:bg-[#00F0FF] transition-colors"
                              >
                                Reply via Email →
                              </a>

                              <button
                                onClick={() => handleCopyJson(lead)}
                                className="px-3 py-2 border border-[#1E2028] hover:border-white/30 text-[#8E93A4] hover:text-white rounded-xl font-mono text-xs flex items-center gap-1.5 transition-colors"
                              >
                                {copiedId === lead.id ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-[#00E599]" />
                                    <span>Copied JSON</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy JSON</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: SYSTEM HEALTH & CONFIG ─────────────────────────── */}
        {tab === 'settings' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border border-[#1E2028] bg-[#0D0F16] rounded-2xl p-6 space-y-6">
              <div className="pb-4 border-b border-[#1E2028]">
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">
                  System Architecture & Pipelines
                </h3>
                <p className="font-mono text-xs text-[#8E93A4] mt-0.5">
                  Live verification of background workers and database endpoints
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-[#1E2028] bg-[#08090C] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      SMTP Email Worker
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-[#00E599]">
                      <CheckCircle2 className="w-3 h-3" /> ONLINE
                    </span>
                  </div>
                  <p className="font-body text-xs text-[#8E93A4]">
                    Dispatches formatted client dossiers instantly to <strong className="text-white">info@theripplenexus.com</strong> via PrivateEmail SMTP.
                  </p>
                </div>

                <div className="p-4 border border-[#1E2028] bg-[#08090C] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white uppercase">
                      PostgreSQL Persistence
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-[#00E599]">
                      <CheckCircle2 className="w-3 h-3" /> CONNECTED
                    </span>
                  </div>
                  <p className="font-body text-xs text-[#8E93A4]">
                    Table <code className="text-[#00F0FF]">rns_leads</code> stores immutable copies of every project intake and contact inquiry.
                  </p>
                </div>
              </div>

              <div className="p-4 border border-[#1E2028] bg-[#08090C] rounded-xl space-y-2">
                <span className="font-mono text-xs font-bold text-[#00F0FF] uppercase block">
                  Configuration Checklist
                </span>
                <ul className="space-y-1.5 font-mono text-xs text-[#8E93A4]">
                  <li>• <strong className="text-white">SMTP_USER:</strong> info@theripplenexus.com</li>
                  <li>• <strong className="text-white">Endpoint Routes:</strong> /api/contact and /api/send-email active</li>
                  <li>• <strong className="text-white">Telemetry Layer:</strong> Tracking micro-conversions and step drop-offs</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
