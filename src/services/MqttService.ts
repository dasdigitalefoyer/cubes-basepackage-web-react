import * as mqtt from 'mqtt'

export interface IMqttService {
  connect(host: string, options: mqtt.IClientOptions): void
  disconnect(): void
  subscribe(topic: string): void
  unsubscribe(topic: string): void
  publish(topic: string, message: string): void
  onMessage(topic: string, message: string): void
}

export class MqttService implements IMqttService {
  private client: mqtt.MqttClient | null = null

  /**
   * Constructor
   */
  constructor() {
    this.connect('wss://broker.mirevi.team:9001/mqtt', {
      clientId: 'cubeFrontend_' + Math.random().toString(16).substr(2, 8),
      username: 'mirevi',
      password: 'pastelquail546',
      clean: false,
      reconnectPeriod: 1000,
      connectTimeout: 30000,
      keepalive: 60,
      resubscribe: true,
    })
  }

  /**
   * Connects to the MQTT broker
   *
   * @param host
   * @param options
   * @returns void
   */
  connect(host: string, options: mqtt.IClientOptions): void {
    this.client = mqtt.connect(host, options)
    this.client.on('connect', () => {
      this.subscribe('cube/#')
    })
    this.client.on('reconnect', () => {
      console.log('MQTT client reconnecting')
    })
    this.client.on('close', () => {
      console.log('MQTT client disconnected')
    })
    this.client.on('message', (topic, message) => {
      this.onMessage(topic, message.toString() as string)
    })
  }

  /**
   * Disconnects from the MQTT broker
   *
   * @returns void
   */
  disconnect(): void {
    if (this.client) {
      this.client.end()
      this.client = null
    }
  }
  subscribe(topic: string): void {
    console.log('MQTT subscribe', topic)
  }
  unsubscribe(topic: string): void {
    console.log('MQTT unsubscribe', topic)
  }
  publish(topic: string, message: string): void {
    console.log('MQTT publish', topic, message)
  }
  onMessage(topic: string, message: string): void {
    console.log('MQTT message received', topic, message)
  }
}
