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
export type StateStore<T> = {
  cubeState: CubeState[]
  addCubeState: (cubeState: CubeState) => void
  updateCubeState: (cubeState: CubeState) => void
  findCubeState: (id: string) => CubeState | undefined
  existsCubeState: (id: string) => boolean
  appState: T[]
  addAppState: (appState: T) => void
  updateAppState: (appState: T) => void
  findAppState: (id: string) => T | undefined
  existsAppState: (id: string) => boolean
  runningApp: AppState | null
  setRunningApp: (cubeApp: AppState) => void
}
