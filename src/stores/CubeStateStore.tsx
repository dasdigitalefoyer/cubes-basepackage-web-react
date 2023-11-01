import { create } from 'zustand'

// TODO: Is the cube state

/**
 * This is the type of the cube state object that is set in the cube state store.
 */
export type CubeState = {
  timestamp: string
  meta: {
    version: string
  }
  id: string
  state: string
  system: {
    ip: string
    mac: string
    hostname: string
  }
  cubeControl: {
    timestamp: string
    meta: {
      version: string
    }
    position: {
      x: number
      y: number
    }
    orientation: number
    velocity: {
      x: number
      y: number
    }
  }
}

/**
 * This is the type of the cube state store.
 */
type CubeStateStore = {
  cubeState: CubeState[]
  addCubeState: (cubeState: CubeState) => void
  updateCubeState: (cubeState: CubeState) => void
  removeCubeState: (id: string) => void
  findCubeState: (id: string) => CubeState | undefined
  existsCubeState: (id: string) => boolean
}

/**
 * This is the cube state store.
 */
export const useCubeStateStore = create<CubeStateStore>((set, get) => ({
  cubeState: [],
  addCubeState: (cubeState) => set((state) => ({ cubeState: [...state.cubeState, cubeState] })),
  updateCubeState: (cubeState) =>
    set((state) => ({ cubeState: state.cubeState.map((state) => (state.id === cubeState.id ? cubeState : state)) })),
  removeCubeState: (cubeId) => set((state) => ({ cubeState: state.cubeState.filter((state) => state.id !== cubeId) })),
  findCubeState: (cubeId) => {
    const { cubeState } = get()
    return cubeState.find((state) => state.id === cubeId)
  },
  existsCubeState: (cubeId) => {
    const { cubeState } = get()
    return cubeState.some((state) => state.id === cubeId)
  }
}))
