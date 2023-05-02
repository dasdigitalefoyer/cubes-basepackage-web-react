export enum MediaMode {
  NONE = 'NONE',
  SOUND = 'SOUND',
  MONOLOGUE = 'MONOLOGUE',
  SURPRISE = 'SURPRISE',
  ACTION = 'ACTION',
}

export type CubeMode = {
  mode: MediaMode
  mediaIndex: number
}
