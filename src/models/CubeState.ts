export type CubeState = {
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

export type CubeStateStore = {
  cubeState: CubeState[]
  addCubeState: (cube: CubeState) => void
  updateCubeState: (cube: CubeState) => void
  removeCubeState: (cubeId: string) => void
  clearCubeState: () => void
}
