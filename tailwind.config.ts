import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        // Sovereign Violet brand display — Satoshi Variable (Fontshare)
        display: ["Satoshi Variable", "Satoshi", "Inter", "ui-sans-serif", "system-ui"],
        serif:   ["Satoshi Variable", "Satoshi", "Inter", "ui-sans-serif", "system-ui"],
        // Body & UI — Inter Variable
        sans:    ["Inter", "Inter Variable", "ui-sans-serif", "system-ui"],
        body:    ["Inter", "Inter Variable", "ui-sans-serif", "system-ui"],
        // Data layer — metrics, labels, mono
        mono:    ["JetBrains Mono", "Geist Mono", "ui-monospace", "monospace"],
      },
      colors: {
        // ── Ripple Nexus — Sovereign Violet Brand Tokens ──────────
        "nexus-violet":  "#7C5CFF",
        "violet-hover":  "#6A47FF",
        "violet-pressed":"#5736EB",
        plasma:          "#B794FF",
        "ion-cyan":      "#22D3EE",
        "quantum-lime":  "#A3E635",

        obsidian:        "#0A0B14",
        ink:             "#12141F",
        carbon:          "#1A1D2E",
        "graphite-600":  "#2A2E44",
        "graphite-500":  "#4A5070",
        "graphite-400":  "#6B7394",
        "graphite-300":  "#9BA2BE",
        "graphite-200":  "#C6CBDD",
        "graphite-100":  "#E4E7F0",
        pearl:           "#F4F5FA",

        // ── shadcn/ui semantic tokens ───────────────────────────
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT:              "hsl(var(--sidebar-background))",
          foreground:           "hsl(var(--sidebar-foreground))",
          primary:              "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent:               "hsl(var(--sidebar-accent))",
          "accent-foreground":  "hsl(var(--sidebar-accent-foreground))",
          border:               "hsl(var(--sidebar-border))",
          ring:                 "hsl(var(--sidebar-ring))",
        },
      },
      fontSize: {
        "display-2xl": ["clamp(3rem,7.5vw,6rem)",     { lineHeight: "1.02", letterSpacing: "-0.04em" }],
        "display-xl":  ["clamp(2.5rem,6vw,4.5rem)",   { lineHeight: "1.04", letterSpacing: "-0.035em" }],
        "display-lg":  ["clamp(2rem,4.5vw,3.5rem)",   { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display-md":  ["clamp(1.75rem,3.5vw,2.75rem)",{ lineHeight: "1.1",  letterSpacing: "-0.025em" }],
        "display-sm":  ["clamp(1.4rem,2.5vw,2rem)",   { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "body-lg":     ["1.125rem", { lineHeight: "1.6", letterSpacing: "-0.005em" }],
        label:         ["0.6875rem", { lineHeight: "1", letterSpacing: "0.14em" }],
      },
      maxWidth: {
        editorial: "68ch",
        dossier:   "120ch",
      },
      borderRadius: {
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 4px)",
        sm:   "calc(var(--radius) - 8px)",
        "4px":"4px",
        "8px":"8px",
        "12px":"12px",
        "16px":"16px",
        "24px":"24px",
      },
      boxShadow: {
        "glow-violet": "0 0 0 1px rgba(124,92,255,0.35), 0 8px 32px -4px rgba(124,92,255,0.45)",
        "glow-violet-sm": "0 4px 16px -2px rgba(124,92,255,0.3)",
        "inner-dark": "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "pulse-violet": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(124,92,255,0.4)" },
          "50%":       { boxShadow: "0 0 0 8px rgba(124,92,255,0)" },
        },
      },
      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "fade-up":         "fade-up 0.6s ease-out forwards",
        "fade-in":         "fade-in 0.5s ease-out forwards",
        float:             "float 6s ease-in-out infinite",
        "pulse-violet":    "pulse-violet 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
