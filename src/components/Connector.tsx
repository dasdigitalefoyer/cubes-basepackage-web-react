import { useEffect, useRef } from 'react'
import * as mqtt from 'mqtt'
import { ConnectorProps } from '../types'
import { useMqttStore, useStateStore } from '../stores'

const Connector = ({ brokerUrl = 'ws://192.168.111.1:9001', options = {} }: ConnectorProps) => {
  const clientValid = useRef(false)
  const { client, setClient, setConnectionStatus, setError } = useMqttStore()
  const { addCubeState, updateCubeState, existsCubeState } = useStateStore()

  // Connect to the broker when the component mounts
  useEffect(() => {
    if (!client && !clientValid.current) {
      clientValid.current = true
      setConnectionStatus('connecting')

      const mqttClient = mqtt.connect(brokerUrl, options)
      setClient(mqttClient)

      // subscribe to all puzzleCubes state topics
      mqttClient.on('connect', () => {
        setConnectionStatus('connected')
        mqttClient.subscribe('puzzleCubes/+/state')
        // TODO: wie lautet der topic für die app state?
        //mqttClient.subscribe('puzzleCubes/+/app/state')
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
      })
      // write cube state or app state to the store
      mqttClient.on('message', (topic, message) => {
        console.log(topic, message.toString())
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

  return null
}

export default Connector
