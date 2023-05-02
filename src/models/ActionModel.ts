export enum ActionType {
  PAUSE = 'PAUSE',
  DOUBLE_SPEED = 'DOUBLE_SPEED',
  HALF_SPEED = 'HALF_SPEED',
  BLINK = 'BLINK',
  ZOOM_IN = 'ZOOM_IN',
  ZOOM_OUT = 'ZOOM_OUT',
  SHUFFLE_CONTENT = 'SHUFFLE_CONTENT',
  BLACK_AND_WHITE = 'BLACK_AND_WHITE',
}

export enum ActionState {
  STARTED = 'STARTED',
  STOPPED = 'STOPPED',
}

export type Action = {
  sender: string
  action: ActionType
  state: ActionState
}
