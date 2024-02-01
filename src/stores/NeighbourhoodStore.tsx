import { create } from 'zustand'
import { Subject } from 'rxjs';
import { CubeConnection, ValidConnection } from '../models/Neighbourhood'
import { useMqttStore } from './MqttStore';


type NeighbourhoodStore = {
    
    connectionTopic: string
    publishValidConnection: (cubeId:string, connection: ValidConnection) => void
    connectionPairSubject : Subject<CubeConnection>

}

export const useNeighbourhoodStore = create<NeighbourhoodStore>(() => ({
    connectionTopic: 'puzzleCubes/neighbourhood/connection',    
    publishValidConnection: (cubeId:string, connection: ValidConnection) => {
        useMqttStore().publish( 'puzzleCubes/' + cubeId +'/app/connection', JSON.stringify(connection))
    },
    connectionPairSubject: new Subject<CubeConnection>()
}))
