import { useEffect } from 'react'
import { useMqttStore, useCubeStateStore } from '../stores'

const CubeState = () => {
  const { client } = useMqttStore()
  const { addCubeState, updateCubeState, existsCubeState } = useCubeStateStore()

  useEffect(() => {
    if (client) {
      client.subscribe('puzzleCubes/+/state')
      client.on('message', (topic, message) => {
        if (topic.startsWith('puzzleCubes/') && topic.endsWith('/state')) {
          const cubeId = topic.split('/')[1]
          const isApp = topic.split('/')[2] === 'app'
          if (isApp) return
          const cubeState = JSON.parse(message.toString())
          const exists = existsCubeState(cubeId)

          if (exists) {
            updateCubeState(cubeState)
          } else {
            addCubeState(cubeState)
          }
        }
      })
    } else {
      console.log('Please connect to the broker first using the Connector component')
    }
  }, ['client'])
}

export default CubeState
