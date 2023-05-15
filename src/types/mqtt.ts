import { MqttClient, IClientOptions } from 'mqtt'

export type Error = {
  name: string
  message: string
  stack?: string
}

export type Message = {
  topic: string
  payload: string
  qos: number
  retain: boolean
}

export type ConnectorProps = {
  brokerUrl: string
  options: IClientOptions
}

export type UseSubscriptionProps = {
  topic: string
  client?: MqttClient | null
  message?: Message | null
  connectionStatus?: string | Error
}
