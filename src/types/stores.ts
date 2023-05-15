import * as mqtt from 'mqtt'

export type MqttStore = {
  client: mqtt.MqttClient | null
  connectionStatus: string | Error
  messages: string[]
  setClient: (client: mqtt.MqttClient | null) => void
  setConnectionStatus: (status: string | Error) => void
  addMessage: (message: string) => void
  clearMessages: () => void
}
