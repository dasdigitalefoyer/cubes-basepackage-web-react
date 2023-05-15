import * as mqtt from 'mqtt'
import { CubeState } from './cubes'

export type MqttStore = {
  client: mqtt.MqttClient | null
  connectionStatus: string | Error
  messages: string[]
  setClient: (client: mqtt.MqttClient | null) => void
  setConnectionStatus: (status: string | Error) => void
  addMessage: (message: string) => void
  clearMessages: () => void
}

export type CubeStateStore = {
  cubeState: CubeState[]
  addCubeState: (cubeState: CubeState) => void
  updateCubeState: (cubeState: CubeState) => void
  findCubeState: (id: string) => CubeState | undefined
  existsCubeState: (id: string) => boolean
}
