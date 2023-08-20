import { create } from 'zustand'

/**
 * CubeState
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
 * CubeApp
 */
enum AppCategory {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export type CubeApp = {
  timestamp: Date
  meta: {
    version: string
  }
  id: string
  category: AppCategory
  name: string
  description: string
  version: string
  rootPath: string
  webResourcePath?: string
  webRoot: string
  clientAppRoot: string
  clientAppType: string
  active: boolean
  miscData: object
}

/**
 * StateStore
 */
type StateStore = {
  cubeState: CubeState[]
  addCubeState: (cubeState: CubeState) => void
  updateCubeState: (cubeState: CubeState) => void
  removeCubeState: (id: string) => void
  findCubeState: (id: string) => CubeState | undefined
  existsCubeState: (id: string) => boolean
  cubeApp: CubeApp | null
  setCubeApp: (cubeApp: CubeApp) => void
}

/**
 * useStateStore
 */
export const useStateStore = create<StateStore>((set, get) => ({
  cubeState: [],
  cubeApp: null,
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
  },
  setCubeApp: (cubeApp) => set(() => ({ cubeApp }))
}))
