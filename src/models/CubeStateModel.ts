export type CubeStateModel = {
  timestamp: Date
  meta: {
    version: string
  }
  id: string
  state: string
  neighbourhood?: []
  light?: []
  audio?: []
  display?: []
  cubeControl?: {
    position: { x: Number; y: Number }
  }
}
