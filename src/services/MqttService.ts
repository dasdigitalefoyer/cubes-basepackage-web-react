import * as mqtt from 'mqtt'

const host: string = 'wss://broker.mirevi.team:9001/mqtt'
const options: mqtt.IClientOptions = {
  clientId: 'cubeFrontend',
  username: 'mirevi',
  password: 'pastelquail546',
  clean: false,
  reconnectPeriod: 1000,
  connectTimeout: 30000,
  keepalive: 60,
  resubscribe: true,
}

/**
 * MQTT service
 */
export class MqttService {
  private static instance: MqttService
  private client: mqtt.MqttClient | null = null

  /**
   * Constructor
   */
  private constructor() {
    console.log('[MqttService] Initializing MQTT service')
    if (!this.client) {
      this.connect(host, options)
    }
  }

  public static getInstance(): MqttService {
    if (!MqttService.instance) {
      MqttService.instance = new MqttService()
    }

    return MqttService.instance
  }

  public getClient(): mqtt.MqttClient | null {
    return this.client
  }

  /**
   * Connects to the MQTT broker
   */
  public connect(host: string, options: mqtt.IClientOptions): void {
    if (!this.client) {
      console.log('[connect] Connecting to MQTT broker')
      this.client = mqtt.connect(host, options)
      this.client.on('connect', () => {
        console.log('MQTT client connected')
      })
      this.client.on('reconnect', () => {
        console.log('MQTT client reconnecting')
      })
      this.client.on('close', () => {
        console.log('MQTT client disconnected')
      })
      // this.client.on('message', (topic, message) => {
      //   this.onMessage(topic, message.toString())
      // })
    }
  }

  /**
   * Disconnects from the MQTT broker
   */
  public disconnect(): void {
    if (this.client) {
      console.log('[disconnect] Disconnecting from MQTT broker')
      this.client.end()
      this.client = null
    }
  }

  /**
   * Subscribes to a topic
   */
  public subscribe(topic: string): void {
    if (this.client) {
      console.log('[subscribe] Subscribing to topic: ' + topic)
      this.client.subscribe(topic)
    }
  }

  /**
   * Unsubscribes from a topic
   */
  public unsubscribe(topic: string): void {
    if (this.client) {
      console.log('[unsubscribe] Unsubscribing from topic: ' + topic)
      this.client.unsubscribe(topic)
    }
  }

  /**
   * Publishes a message to a topic
   */
  public publish(topic: string, message: string, options: mqtt.IClientPublishOptions): void {
    if (this.client) {
      console.log('[publish] Publishing to topic: ' + topic)
      this.client.publish(topic, message, options)
    }
  }
}
