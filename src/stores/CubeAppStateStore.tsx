import { create } from 'zustand'
import { CubeAppStateStore } from '../types'

const useCubeAppStore = create<CubeAppStateStore>((set, get) => ({
  cubeAppStates: [],
  addCubeAppState: (cubeAppState) => set((state) => ({ cubeAppStates: [...state.cubeAppStates, cubeAppState] })),
  updateCubeAppState: (cubeAppState) =>
    set((state) => ({
      cubeAppStates: state.cubeAppStates.map((state) => (state.id === cubeAppState.id ? cubeAppState : state))
    })),
  findCubeAppState: (id) => {
    const cubeApp = get().cubeAppStates.find((cubeAppState) => cubeAppState.id === id)
    if (!cubeApp) throw new Error(`CubeApp not found: ${id}`)
    return cubeApp
  },
  removeCubeAppState: (id) =>
    set((state) => ({ cubeAppStates: state.cubeAppStates.filter((cubeAppState) => cubeAppState.id !== id) })),
  existsCubeAppState: (id) => get().cubeAppStates.some((cubeAppState) => cubeAppState.id === id)
}))

export default useCubeAppStore
