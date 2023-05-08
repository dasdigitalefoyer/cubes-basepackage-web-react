import * as mqtt from 'mqtt'

/**
 * Interface for the MQTT service
 */
export interface IMqttService {
  connect(host: string, options: mqtt.IClientOptions): void
  disconnect(): void
  subscribe(topic: string): void
  unsubscribe(topic: string): void
  publish(topic: string, message: string, options: mqtt.IClientPublishOptions): void
  onMessage(topic: string, message: string): void
  subscribeOnConnect(): void
  publishToCube(cubeId: string, topic: string, message: string): void
  publishToAllCubes(topic: string, message: string): void
}

/**
 * MQTT service
 */
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
   */
  connect(host: string, options: mqtt.IClientOptions): void {
    this.client = mqtt.connect(host, options)
    this.client.on('connect', () => {
      this.subscribeOnConnect()
    })
    this.client.on('reconnect', () => {
      console.log('MQTT client reconnecting')
    })
    this.client.on('close', () => {
      console.log('MQTT client disconnected')
    })
    this.client.on('message', (topic, message) => {
      this.onMessage(topic, message.toString())
    })
  }

  /**
   * Disconnects from the MQTT broker
   */
  disconnect(): void {
    if (this.client) {
      this.client.end()
      this.client = null
    }
  }

  /**
   * Subscribes to a topic
   */
  subscribe(topic: string): void {
    if (this.client) {
      this.client.subscribe(topic)
    }
  }

  /**
   * Unsubscribes from a topic
   */
  unsubscribe(topic: string): void {
    if (this.client) {
      this.client.unsubscribe(topic)
    }
  }

  /**
   * Publishes a message to a topic
   */
  publish(topic: string, message: string, options: mqtt.IClientPublishOptions): void {
    if (this.client) {
      this.client.publish(topic, message, options)
    }
  }

  /**
   * Method is called when a message is received
   * from the MQTT broker
   */
  onMessage(topic: string, message: string): void {
    console.log('MQTT message received', topic, message)
  }

  /**
   * Method is called after the connection to the MQTT broker is established
   */
  subscribeOnConnect(): void {
    console.log('MQTT subscribe on connect')
  }

  /**
   * Publishes a message to all cubes
   */
  publishToAllCubes(topic: string, message: string): void {
    throw new Error('Method not implemented.')
  }

  /**
   * Publishes a message to a specific cube using the cubeId
   */
  publishToCube(cubeId: string, topic: string, message: string): void {
    throw new Error('Method not implemented.')
  }
}
