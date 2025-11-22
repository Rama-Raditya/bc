export enum AppStage {
  ENVELOPE = 'ENVELOPE',
  LETTER = 'LETTER',
  CAKE = 'CAKE',
  FINALE = 'FINALE'
}

export interface Particle {
  x: number;
  y: number;
  color: string;
  velocity: { x: number; y: number };
  alpha: number;
  life: number;
}