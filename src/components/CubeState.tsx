import { useEffect } from 'react'
import { useMqttStore, useCubeStateStore } from '../stores'

const useCubeState = () => {
  const { client } = useMqttStore()
  const { addCubeState, updateCubeState, existsCubeState } = useCubeStateStore()

  useEffect(() => {
    if (!client) {
      console.log('Please connect to the broker first using the Connector component')
      return
    }

    client.on('message', (topic, message) => {
      if (topic.startsWith('puzzleCubes/') && topic.endsWith('/state')) {
        const cubeId = topic.split('/')[1]
        if (cubeId === 'app') return
        const cubeState = JSON.parse(message.toString())
        const exists = existsCubeState(cubeId)

        if (exists) {
          updateCubeState(cubeState)
        } else {
          addCubeState(cubeState)
        }
      }
    })
  }, ['client'])
}

export default useCubeState
