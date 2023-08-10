import { create } from 'zustand'
import { StateStore } from '../types'

const useStateStore = create<StateStore>((set, get) => ({
  cubeState: [],
  appState: [],
  runningApp: null,
  addCubeState: (cubeState) => set((state) => ({ cubeState: [...state.cubeState, cubeState] })),
  updateCubeState: (cubeState) =>
    set((state) => ({ cubeState: state.cubeState.map((state) => (state.id === cubeState.id ? cubeState : state)) })),
  findCubeState: (cubeId) => {
    const { cubeState } = get()
    return cubeState.find((state) => state.id === cubeId)
  },
  existsCubeState: (cubeId) => {
    const { cubeState } = get()
    return cubeState.some((state) => state.id === cubeId)
  },
  setRunningApp: (app) => set(() => ({ runningApp: app }))
}))

export default useStateStore
