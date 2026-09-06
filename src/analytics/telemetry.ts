/**
 * Ripple Nexus Analytics & Telemetry Layer
 * 
 * Captures behavioral micro-conversions, funnel velocity, and intent data
 * without collecting invasive personal telemetry.
 */

export type TelemetryEvent =
  | 'page_view'
  | 'hero_cta_click'
  | 'hero_work_click'
  | 'intent_build_select'
  | 'intent_automate_select'
  | 'intent_modernize_select'
  | 'intent_scale_select'
  | 'solution_content_view'
  | 'case_study_open'
  | 'case_study_cta_click'
  | 'capability_open'
  | 'team_section_view'
  | 'founder_link_click'
  | 'project_intake_start'
  | 'project_intake_step_1'
  | 'project_intake_step_2'
  | 'project_intake_step_3'
  | 'project_intake_step_4'
  | 'project_intake_step_5'
  | 'project_intake_complete'
  | 'book_call_click'
  | 'email_click'
  | 'linkedin_click'
  | 'scroll_depth_25'
  | 'scroll_depth_50'
  | 'scroll_depth_75'
  | 'scroll_depth_100';

export interface TelemetryPayload {
  event: TelemetryEvent;
  timestamp: number;
  data?: Record<string, any>;
  sessionDurationSec?: number;
  deviceCategory?: 'mobile' | 'tablet' | 'desktop';
  referrer?: string;
  path?: string;
}

class TelemetryEngine {
  private startTime: number = Date.now();
  private trackedScrollDepths = new Set<number>();
  private listeners: Array<(payload: TelemetryPayload) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initScrollTracker();
    }
  }

  private getDeviceCategory(): 'mobile' | 'tablet' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private initScrollTracker() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight <= 0) return;
          const scrolledPercent = Math.round((window.scrollY / docHeight) * 100);

          [25, 50, 75, 100].forEach((depth) => {
            if (scrolledPercent >= depth && !this.trackedScrollDepths.has(depth)) {
              this.trackedScrollDepths.add(depth);
              this.track(`scroll_depth_${depth}` as TelemetryEvent, { depthPercent: depth });
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  public track(event: TelemetryEvent, data?: Record<string, any>) {
    const payload: TelemetryPayload = {
      event,
      timestamp: Date.now(),
      sessionDurationSec: Math.round((Date.now() - this.startTime) / 1000),
      deviceCategory: this.getDeviceCategory(),
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      path: typeof window !== 'undefined' ? window.location.pathname : '/',
      data,
    };

    // Dispatch to console for development audit
    if (process.env.NODE_ENV !== 'production') {
      console.log(`%c[RIPPLE TELEMETRY] ${event}`, 'color: #00F0FF; font-weight: bold;', payload);
    }

    // Google Tag Manager / DataLayer if configured
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: payload.event,
        ...payload.data,
        session_duration: payload.sessionDurationSec,
      });
    }

    // Notify registered listeners
    this.listeners.forEach((fn) => fn(payload));
  }

  public onTrack(listener: (payload: TelemetryPayload) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== listener);
    };
  }
}

export const telemetry = new TelemetryEngine();
