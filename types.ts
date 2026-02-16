
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  SECURITY_LOCKS = 'SECURITY_LOCKS',
  AI_BEHAVIOR = 'AI_BEHAVIOR',
  INTRUDER_LOGS = 'INTRUDER_LOGS',
  SETTINGS = 'SETTINGS'
}

export interface IntruderLog {
  id: string;
  timestamp: string;
  photoUrl: string;
  location: string;
  attemptedApp: string;
  method: 'PIN' | 'EMOTION' | 'PATTERN' | 'AR';
}

export interface UsageData {
  time: string;
  minutes: number;
}

export interface SecurityConfig {
  isDualMode: boolean;
  secretModeActive: boolean;
  emotionLockEnabled: boolean;
  invisiblePatternEnabled: boolean;
  arLockEnabled: boolean;
}
