import { useEffect, useRef } from 'react'
import * as mqtt from 'mqtt'
import { ConnectorProps } from '../types'
import { useMqttStore } from '../stores'

const Connector = ({ brokerUrl, options = { keepalive: 0 } }: ConnectorProps) => {
  const clientValid = useRef(false)
  const { client, setClient, setConnectionStatus, setError } = useMqttStore()

  // Connect to the broker when the component mounts
  useEffect(() => {
    if (!client && !clientValid.current) {
      clientValid.current = true
      setConnectionStatus('connecting')

      const mqttClient = mqtt.connect(brokerUrl, options)
      setClient(mqttClient)

      mqttClient.on('connect', () => {
        setConnectionStatus('connected')
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
