import * as mqtt from 'mqtt'
import { CubeState } from '../models/CubeState'
import { vanillaCubeStateStore } from '../stores'

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
  }

  public static getInstance(): MqttService {
    if (!MqttService.instance) {
      MqttService.instance = new MqttService()
    }

    return MqttService.instance
  }

  /**
   * Connects to the MQTT broker
   */
  public connect(host: string, options: mqtt.IClientOptions): void {
    if (!this.client) {
      console.log('[connect] Connecting to MQTT broker')
      this.client = mqtt.connect(host, options)
      //vanillaMqttStateStore.setState({ client: this.client })
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
  }

  /**
   * Disconnects from the MQTT broker
   */
  public disconnect(): void {
    if (this.client) {
      console.log('[disconnect] Disconnecting from MQTT broker')
      this.client.end()
      this.client = null
      //vanillaMqttStateStore.setState({ client: null })
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

  /**
   * Method is called when a message is received
   * from the MQTT broker
   */
  private onMessage(topic: string, message: string): void {
    console.log('[onMessage] Received message from topic: ' + topic)
    if (topic.startsWith('puzzleCubes/') && topic.endsWith('/state')) {
      const cubeId = topic.split('/')[1]
      const cubeState = JSON.parse(message) as CubeState
      const exists = vanillaCubeStateStore.getState().cubeState.find((item) => item.id === cubeId)
      if (exists) {
        console.log('Updating cube state')
        vanillaCubeStateStore.getState().updateCubeState(cubeState)
      } else {
        console.log('Adding cube state')
        vanillaCubeStateStore.getState().addCubeState(cubeState)
      }
    }
  }

  /**
   * Method is called after the connection to the MQTT broker is established
   */
  private subscribeOnConnect(): void {
    console.log('[subscribeOnConnect] Subscribing to topics')
    if (this.client) {
      this.client.subscribe('puzzleCubes/+/state')
    }
  }

  /**
   * Publishes a message to all cubes
   */
  public publishToAllCubes(message: string): void {
    console.log('[publishToAllCubes] Publishing message to all cubes')
    this.publish('puzzleCubes/+/state', message, { qos: 1 })
  }

  /**
   * Publishes a message to a specific cube using the cubeId
   */
  public publishToCube(cubeId: string, message: string): void {
    console.log('[publishToCube] Publishing message to cube: ' + cubeId)
    this.publish('puzzleCubes/' + cubeId + '/state', message, { qos: 1 })
  }
}
