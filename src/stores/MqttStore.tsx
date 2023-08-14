import { create } from 'zustand'
import * as mqtt from 'mqtt'

type Error = {
  name: string
  message: string
  stack?: string
}

type MqttStore = {
  client: mqtt.MqttClient | null
  connectionStatus: string
  error: Error | null
  setClient: (client: mqtt.MqttClient | null) => void
  setConnectionStatus: (status: string) => void
  setError: (error: Error | null) => void
}

const useMqttStore = create<MqttStore>((set) => ({
  client: null,
  connectionStatus: 'offline',
  error: null,
  setClient: (client) => set(() => ({ client })),
  setConnectionStatus: (connectionStatus) => set(() => ({ connectionStatus })),
  setError: (error) => set(() => ({ error }))
}))

export default useMqttStore
