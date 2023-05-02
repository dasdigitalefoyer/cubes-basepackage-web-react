import { createStore } from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'
import { CubeStateStore } from '../models/CubeState'

export const vanillaCubeStateStore = createStore<CubeStateStore>()(
  devtools((set) => ({
    cubeState: [],
    addCubeState: (cubeState) => set((state) => ({ cubeState: [...state.cubeState, cubeState] })),
    updateCubeState: (cubeState) => set((state) => ({ cubeState: [...state.cubeState, cubeState] })),
    removeCubeState: (cubeState) => set((state) => ({ cubeState: [...state.cubeState, cubeState] })),
    clearCubeState: () => set(() => ({ cubeState: [] })),
  })),
)
