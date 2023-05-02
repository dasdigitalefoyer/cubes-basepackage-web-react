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
  addCubeState: (cubeState: CubeState) => void
  updateCubeState: (cubeState: CubeState) => void
  removeCubeState: (cubeState: CubeState) => void
  clearCubeState: () => void
}
