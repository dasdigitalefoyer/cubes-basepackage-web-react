import { createStore } from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'
import { CubeStateStore } from '../models/CubeState'

export const vanillaCubeStateStore = createStore<CubeStateStore>()(
  devtools((set) => ({
    cubeState: [],
    addCubeState: (item) => {
      set((state) => ({
        cubeState: [...state.cubeState, item],
      }))
    },
    updateCubeState: (item) => {
      set((state) => ({
        cubeState: state.cubeState.map((cubeState) =>
          cubeState.id === item.id ? { ...cubeState, ...item } : cubeState,
        ),
      }))
    },
    removeCubeState: (cubeId) => {
      set((state) => ({
        cubeState: state.cubeState.filter((cubeState) => cubeState.id !== cubeId),
      }))
    },
    clearCubeState: () => {
      set((state) => ({
        cubeState: [],
      }))
    },
  })),
)
