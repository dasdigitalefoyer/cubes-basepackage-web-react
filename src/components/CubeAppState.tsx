import { useEffect } from 'react'
import { useMqttStore, useCubeAppStore } from '../stores'

const useCubeAppState = () => {
  const { client } = useMqttStore()
  const { addCubeAppState, updateCubeAppState, existsCubeAppState } = useCubeAppStore()

  useEffect(() => {
    if (!client) {
      console.log('Please connect to the broker first using the Connector component')
      return
    }

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
  }, ['client'])
}

export default useCubeAppState
