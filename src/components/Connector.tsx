import { useEffect, useRef } from 'react'
import mqtt from 'mqtt'
import { useMqttStore, useCubeStateStore } from '../stores'
import { useInterval } from 'usehooks-ts'
import { useNeighbourhoodStore } from '../stores/NeighbourhoodStore'

// This component is responsible for connecting to the MQTT broker and
// writing the state of the cubes to the store.
// It also subscribes to the app state topic and writes that to the store
// as well.

/**
 * ConnectorProps
 *
 * @param brokerUrl The URL of the MQTT broker
 * @param options The options to pass to the MQTT client
 * @returns
 */
interface ConnectorProps {
  brokerUrl?: string
  options?: mqtt.IClientOptions
}

/**
 * Connector component
 *
 * @param ConnectorProps The props for the component
 * @returns
 */
export const Connector = ({ brokerUrl = 'ws://192.168.111.1:9001', options = {} }: ConnectorProps) => {
  const clientValid = useRef(false)
  const { client, setClient, setConnectionStatus, setError } = useMqttStore()
  const { cubeState, addCubeState, updateCubeState, removeCubeState, existsCubeState } = useCubeStateStore()

  const { connectionTopic, connectionPairSubject } = useNeighbourhoodStore()

  // Remove cubes that have not been updated in 60 seconds
  useInterval(() => {
    cubeState.forEach((cube) => {
      if (Date.parse(cube.timestamp) < Date.now() - 60000) {
        removeCubeState(cube.id)
      }
    })
  }, 1000)

  // Connect to the broker when the component mounts
  // and subscribe to the cube state topic
  // and write the state to the mqtt store
  useEffect(() => {
    if (!client && !clientValid.current) {
      clientValid.current = true
      setConnectionStatus('connecting')

      const mqttClient = mqtt.connect(brokerUrl, options)
      setClient(mqttClient)

      mqttClient.on('connect', () => {
        setConnectionStatus('connected')
        mqttClient.subscribe('puzzleCubes/+/state')
        mqttClient.subscribe(connectionTopic)
      })
      mqttClient.on('reconnect', () => {
        setConnectionStatus('reconnecting')
      })
      mqttClient.on('error', (err) => {
        setConnectionStatus('error')
        setError(err)
      })
      mqttClient.on('close', () => {
        setConnectionStatus('disconnected')
        mqttClient.end(true)
        setClient(null)
        clientValid.current = false
      })
      // write cube state or app state to the store
      mqttClient.on('message', (topic, message) => {
        //console.log(topic, message.toString())
        const state = JSON.parse(message.toString())
        if (topic.startsWith('puzzleCubes/') && topic.endsWith('/state')) {
          const cubeId = topic.split('/')[1]
          const isApp = topic.split('/')[2] === 'app'
          if (isApp) return

          const exists = existsCubeState(cubeId)

          if (exists) {
            updateCubeState(state)
          } else {
            addCubeState(state)
          }
        }
        if (topic === connectionTopic) {
          console.log('got nh connection')
          connectionPairSubject.next(state)
        }
      })
    }
  }, ['client', 'clientValid', 'brokerUrl', 'options'])

  // Only do this when the component unmounts
  useEffect(
    () => () => {
      if (client) {
        client.end(true)
        setClient(null)
        clientValid.current = false
      }
    },
    [client, clientValid]
  )

  return null
}
