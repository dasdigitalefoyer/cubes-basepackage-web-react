import * as mqtt from 'mqtt'
import { vanillaMqttStateStore } from '../stores/MqttStateStore'
import { CubeState } from '../models/CubeState'
import { vanillaCubeStateStore } from '../stores'

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
  publishToCube(cubeId: string, message: string): void
  publishToAllCubes(topic: string, message: string): void
}

/**
 * MQTT service
 */
export class MqttService implements IMqttService {
  client = vanillaMqttStateStore.getState().client

  /**
   * Constructor
   */
  constructor() {
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

  /**
   * Connects to the MQTT broker
   */
  connect(host: string, options: mqtt.IClientOptions): void {
    if (!this.client) {
      this.client = mqtt.connect(host, options)
      vanillaMqttStateStore.setState({ client: this.client })
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
  disconnect(): void {
    if (this.client) {
      this.client.end()
      this.client = null
      vanillaMqttStateStore.setState({ client: null })
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
    if (topic.startsWith('puzzleCubes/') && topic.endsWith('/state')) {
      const cubeId = topic.split('/')[1]
      const cubeState = JSON.parse(message) as CubeState
      const exists = vanillaCubeStateStore.getState().cubeState.find((cubeState) => cubeState.id === cubeId)
      console.log('EXISTS: ' + exists)
      if (exists) {
        console.log('Updating cube state')
        vanillaCubeStateStore.getState().updateCubeState(cubeState)
      } else {
        console.log('Adding cube state')
        vanillaCubeStateStore.getState().addCubeState(cubeState)
      }
      console.log(vanillaCubeStateStore.getState().cubeState)
    }
    console.log('MQTT message received: ' + topic + ' ' + message)
  }

  /**
   * Method is called after the connection to the MQTT broker is established
   */
  subscribeOnConnect(): void {
    if (this.client) {
      this.client.subscribe('puzzleCubes/+/state')
    }
  }

  /**
   * Publishes a message to all cubes
   */
  publishToAllCubes(message: string): void {
    this.publish('puzzleCubes/+/state', message, { qos: 1 })
  }

  /**
   * Publishes a message to a specific cube using the cubeId
   */
  publishToCube(cubeId: string, message: string): void {
    this.publish('puzzleCubes/' + cubeId + '/state', message, { qos: 1 })
  }
}
