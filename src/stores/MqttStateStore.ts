import { createStore } from 'zustand/vanilla'
import { MqttModel } from '../models/MqttModel'

export const vanillaMqttStateStore = createStore<MqttModel>(() => ({
  client: null,
}))
