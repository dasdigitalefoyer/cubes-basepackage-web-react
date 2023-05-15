import { create } from 'zustand'
import { CubeStateStore } from '../types'

const useCubeStateStore = create<CubeStateStore>((set, get) => ({
  cubeState: [],
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
  }
}))

export default useCubeStateStore
