import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CubeStateModel } from '../models/CubeStateModel'

export type BaseStore = {
  cubeState: CubeStateModel[]
  addCubeState: (cube: CubeStateModel) => void
  updateCubeState: (cube: CubeStateModel) => void
  removeCubeState: (cubeId: string) => void
  clearCubeState: () => void
}

export const puzzleCubeBaseStore = create<BaseStore>()(
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
