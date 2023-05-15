import { create } from 'zustand'
import { MqttStore } from '../types'

const useMqttStore = create<MqttStore>((set) => ({
  client: null,
  connectionStatus: 'offline',
  messages: [],
  setClient: (client) => set(() => ({ client })),
  setConnectionStatus: (connectionStatus) => set(() => ({ connectionStatus })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set(() => ({ messages: [] })),
}))

export default useMqttStore
