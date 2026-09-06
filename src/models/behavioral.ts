export type BehavioralIntentId = 'build' | 'automate' | 'modernize' | 'scale';

export interface IntentProfile {
  id: BehavioralIntentId;
  label: string;
  tagline: string;
  statement: string;
  ctaText: string;
  focusAreas: string[];
  architecturePreview: {
    title: string;
    description: string;
    metrics: { label: string; value: string }[];
    technologies: string[];
  };
}

export interface CaseStudyItem {
  id: string;
  title: string;
  client: string;
  industry: string;
  intentCategory: BehavioralIntentId;
  summary: string;
  problem: string;
  context: string;
  decision: string;
  build: string;
  system: string;
  result: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  duration: string;
  diagramAsset?: string;
}

export interface CapabilityGroup {
  id: string;
  title: string;
  description: string;
  subCapabilities: {
    name: string;
    description: string;
    impact: string;
  }[];
}

export interface ProjectIntakeData {
  problemType: 'new_product' | 'internal_platform' | 'ai_automation' | 'existing_software' | 'data_infrastructure' | 'not_sure';
  contextAnswers: Record<string, string>;
  timeline: string;
  name: string;
  email: string;
  company?: string;
}
