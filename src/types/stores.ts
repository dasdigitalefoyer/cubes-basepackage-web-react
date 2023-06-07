import * as mqtt from 'mqtt'
import { CubeState } from './cubes'
import { AppState } from './app'
import { Error } from './mqtt'

/**
 * MqttStore
 */
export type MqttStore = {
  client: mqtt.MqttClient | null
  connectionStatus: string
  error: Error | null
  setClient: (client: mqtt.MqttClient | null) => void
  setConnectionStatus: (status: string) => void
  setError: (error: Error | null) => void
}

/**
 * StateStore
 */
export type StateStore = {
  cubeState: CubeState[]
  addCubeState: (cubeState: CubeState) => void
  updateCubeState: (cubeState: CubeState) => void
  findCubeState: (id: string) => CubeState | undefined
  existsCubeState: (id: string) => boolean
  appState: AppState | null
  setAppState: (cubeApp: AppState) => void
}
