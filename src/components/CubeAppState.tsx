import { useEffect } from 'react'
import { useMqttStore, useCubeAppStateStore } from '../stores'

const CubeAppState = () => {
  const { client } = useMqttStore()
  const { addCubeAppState, updateCubeAppState, existsCubeAppState } = useCubeAppStateStore()

  useEffect(() => {
    if (client) {
      client.on('message', (topic, message) => {
        // TODO: Change logic (can cubeId be in topic?)
        if (topic.startsWith('puzzleCubes/') && topic.endsWith('/state')) {
          const cubeId = topic.split('/')[1]
          const cubeApp = JSON.parse(message.toString())
          const exists = existsCubeAppState(cubeId)

          if (exists) {
            updateCubeAppState(cubeApp)
          } else {
            addCubeAppState(cubeApp)
          }
        }
      })
    } else {
      console.log('Please connect to the broker first using the Connector component')
    }
  }, ['client'])
}

export default CubeAppState
