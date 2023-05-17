import * as mqtt from 'mqtt'
import { CubeAppState, CubeState } from './cubes'
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
 * CubeAppStore
 */
export type CubeStateStore = {
  cubeState: CubeState[]
  addCubeState: (cubeState: CubeState) => void
  updateCubeState: (cubeState: CubeState) => void
  findCubeState: (id: string) => CubeState | undefined
  existsCubeState: (id: string) => boolean
}

export type CubeAppStateStore = {
  cubeAppStates: CubeAppState[]
  addCubeAppState: (cubeApp: CubeAppState) => void
  updateCubeAppState: (cubeApp: CubeAppState) => void
  removeCubeAppState: (id: string) => void
  findCubeAppState: (id: string) => CubeAppState | undefined
  existsCubeAppState: (id: string) => boolean
}
