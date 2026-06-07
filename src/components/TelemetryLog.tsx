import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TelemetryLog = () => {
  const [logs, setLogs] = useState([
    { id: 1, time: "08:12:43.012", service: "api-gateway", msg: "Request routed to auth-service", latency: "12ms", status: "OK" },
    { id: 2, time: "08:12:43.024", service: "auth-service", msg: "Token validated", latency: "4ms", status: "OK" },
    { id: 3, time: "08:12:43.028", service: "query-engine", msg: "Executing complex JOIN on 40M rows", latency: "-", status: "PENDING" },
  ]);

  useEffect(() => {
    // Simulate real-time logs incoming
    const timer = setTimeout(() => {
      setLogs((prev) => [
        ...prev.map(l => l.id === 3 ? { ...l, latency: "42ms", status: "OK" } : l),
        { id: 4, time: "08:12:43.070", service: "query-engine", msg: "Result set cached in Redis", latency: "8ms", status: "OK" },
        { id: 5, time: "08:12:43.078", service: "api-gateway", msg: "Response 200 OK delivered", latency: "Total: 66ms", status: "OK" }
      ]);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-[#0c0d12] overflow-hidden shadow-2xl font-mono text-[0.65rem] sm:text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#12141c]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="uppercase tracking-widest text-white/50">Prod Cluster · EU-West</span>
        </div>
        <span className="text-[var(--ion-cyan)]">Sub-100ms Verified</span>
      </div>
      
      {/* Log Body */}
      <div className="p-4 flex flex-col gap-2">
        {logs.map((log, i) => (
          <motion.div 
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-wrap sm:flex-nowrap items-start gap-2 sm:gap-4 p-1.5 rounded hover:bg-white/5 transition-colors"
          >
            <span className="text-white/30 shrink-0">{log.time}</span>
            <span className="text-[var(--nexus-violet)] shrink-0 w-24">[{log.service}]</span>
            <span className="text-white/70 flex-1">{log.msg}</span>
            <span className={log.status === "PENDING" ? "text-yellow-500" : "text-green-400"}>
              {log.latency}
            </span>
          </motion.div>
        ))}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-2 text-white/30 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse" /> Waiting for next request...
        </motion.div>
      </div>
    </div>
  );
};

export default TelemetryLog;
