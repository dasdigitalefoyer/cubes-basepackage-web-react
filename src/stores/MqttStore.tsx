import { create } from 'zustand'
import * as mqtt from 'mqtt'

/**
 * This is the type of the error object that is set in the mqtt store.
 */
type Error = {
  name: string
  message: string
  stack?: string
}

/**
 * This is the type of the mqtt store.
 */
type MqttStore = {
  client: mqtt.MqttClient | null
  connectionStatus: string
  error: Error | null
  setClient: (client: mqtt.MqttClient | null) => void
  setConnectionStatus: (status: string) => void
  setError: (error: Error | null) => void
}

/**
 * This is the mqtt store.
 */
export const useMqttStore = create<MqttStore>((set) => ({
  client: null,
  connectionStatus: 'offline',
  error: null,
  setClient: (client) => set(() => ({ client })),
  setConnectionStatus: (connectionStatus) => set(() => ({ connectionStatus })),
  setError: (error) => set(() => ({ error }))
}))
