import mqtt from 'mqtt'

export type MqttModel = {
  client: mqtt.MqttClient | null
}
