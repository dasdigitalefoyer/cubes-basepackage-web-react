import { createStore } from 'zustand/vanilla'
import { devtools } from 'zustand/middleware'
import { CubeStateModel } from '../models/CubeStateModel'
import { MqttService } from '../services'

const mqttService = MqttService.getInstance()

export type BaseStore = {
  cubeState: CubeStateModel[]
  subscribeOnConnect: () => void
  publish: (topic: string, message: string, options: any) => void
  addCubeState: (cube: CubeStateModel) => void
  updateCubeState: (cube: CubeStateModel) => void
  removeCubeState: (cubeId: string) => void
  clearCubeState: () => void
}

export const vanillaPuzzlecubeBaseStore = createStore<BaseStore>()(
  devtools((set) => ({
    cubeState: [],
    subscribeOnConnect: () => {
      mqttService.subscribe('puzzleCubes/+/state')
    },
    publish: (topic: string, message: string, options: any) => {
      mqttService.publish(topic, message, options)
    },
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
