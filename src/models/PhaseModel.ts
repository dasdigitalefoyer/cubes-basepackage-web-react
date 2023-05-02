export enum PhaseState {
  STARTED = 'STARTED',
  STOPPED = 'STOPPED',
  PAUSED = 'PAUSED',
}

export type Phase = {
  name: string
  controllable?: boolean
  number: number
  state: PhaseState
}
