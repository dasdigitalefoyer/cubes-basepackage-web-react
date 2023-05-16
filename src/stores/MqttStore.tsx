import { create } from 'zustand'
import { MqttStore } from '../types'

const useMqttStore = create<MqttStore>((set) => ({
  client: null,
  connectionStatus: 'offline',
  setClient: (client) => set(() => ({ client })),
  setConnectionStatus: (connectionStatus) => set(() => ({ connectionStatus }))
}))

export default useMqttStore
