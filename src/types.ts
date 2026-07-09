export interface SessionConfig {
  targetUrl: string;
  commentText: string;
  sessionCount: number;
  baseInterval: number;
  referrerSpoofing: string;
  gridScale: number;
  staggeredMode: boolean;
  activeScroll: boolean;
  autoMuted: boolean;
}

export interface SessionInstance {
  id: string;
  deviceName: string;
  profileId: number;
  status: 'idle' | 'running' | 'paused' | 'error';
  currentStep: 'navigating' | 'commenting' | 'scrolling' | 'waiting';
  lastAction: string;
}

export interface Stats {
  activeProxies: number;
  totalLoads: number;
  countdown: number;
}
