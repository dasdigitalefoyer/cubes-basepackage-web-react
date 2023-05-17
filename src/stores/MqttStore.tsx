import { create } from 'zustand'
import { MqttStore } from '../types'

const useMqttStore = create<MqttStore>((set) => ({
  client: null,
  connectionStatus: 'offline',
  error: null,
  setClient: (client) => set(() => ({ client })),
  setConnectionStatus: (connectionStatus) => set(() => ({ connectionStatus })),
  setError: (error) => set(() => ({ error }))
}))

export default useMqttStore
