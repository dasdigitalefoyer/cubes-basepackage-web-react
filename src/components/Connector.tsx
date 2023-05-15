import { useEffect, useRef } from 'react'
import * as mqtt from 'mqtt'
import { ConnectorProps } from '../types'
import { useMqttStore, useCubeStateStore } from '../stores'

const Connector = ({ brokerUrl, options = { keepalive: 0 } }: ConnectorProps) => {
  const clientValid = useRef(false)
  const { client, setClient, setConnectionStatus } = useMqttStore()
  const { addCubeState, updateCubeState, existsCubeState } = useCubeStateStore()

  // Connect to the broker when the component mounts
  useEffect(() => {
    if (!client && !clientValid.current) {
      clientValid.current = true
      setConnectionStatus('connecting')
      const mqttClient = mqtt.connect(brokerUrl, options)
      setClient(mqttClient)
      mqttClient.on('connect', () => {
        setConnectionStatus('connected')
        setClient(mqttClient)
        mqttClient.subscribe('puzzleCubes/+/state')
      })
      mqttClient.on('reconnect', () => {
        setConnectionStatus('reconnecting')
      })
      mqttClient.on('error', (err) => {
        console.log(`Connection error: ${err}`)
        setConnectionStatus(err.message)
      })
      mqttClient.on('close', () => {
        setConnectionStatus('disconnected')
      })
      mqttClient.on('error', (error) => {
        console.log('error', error)
        setConnectionStatus(error.message)
      })
      mqttClient.on('message', (topic, message) => {
        if (topic.startsWith('puzzleCubes/') && topic.endsWith('/state')) {
          const cubeId = topic.split('/')[1]
          if (cubeId === 'app') return
          const cubeState = JSON.parse(message.toString())
          const exists = existsCubeState(cubeId)

          console.log(exists)

          if (exists) {
            console.log('updating cube state')
            updateCubeState(cubeState)
          } else {
            console.log('adding cube state')
            addCubeState(cubeState)
          }
        }
      })
    }
  }, ['client', 'clientValid', 'brokerUrl', 'options'])

  // Only do this when the component unmounts
  useEffect(
    () => () => {
      if (client) {
        console.log('[unmount] closing mqtt client')
        client.end(true)
        setClient(null)
        clientValid.current = false
      }
    },
    [client, clientValid]
  )
}

export default Connector
