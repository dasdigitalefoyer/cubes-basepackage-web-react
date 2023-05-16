import { create } from 'zustand'
import { CubeAppStateStore } from '../types'

const useCubeAppStateStore = create<CubeAppStateStore>((set, get) => ({
  cubeAppStates: [],
  addCubeAppState: (cubeAppState) => set((state) => ({ cubeAppStates: [...state.cubeAppStates, cubeAppState] })),
  updateCubeAppState: (cubeAppState) =>
    set((state) => ({
      cubeAppStates: state.cubeAppStates.map((state) => (state.id === cubeAppState.id ? cubeAppState : state))
    })),
  findCubeAppState: (id) => {
    const { cubeAppStates } = get()
    return cubeAppStates.find((state) => state.id === id)
  },
  removeCubeAppState: (id) =>
    set((state) => ({ cubeAppStates: state.cubeAppStates.filter((cubeAppState) => cubeAppState.id !== id) })),
  existsCubeAppState: (id) => get().cubeAppStates.some((cubeAppState) => cubeAppState.id === id)
}))

export default useCubeAppStateStore
