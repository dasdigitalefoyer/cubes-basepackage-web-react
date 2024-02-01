export type CubeDirection = 'NONE' | 'FORWARD' | 'BACKWARD' | 'LEFT' | 'RIGHT' 

export type CubeEdge = {
    id: string
    edge: CubeDirection
    equals: (cubeEdge: CubeEdge) => boolean
    }

export type CubeConnection = {
    connected: boolean
    pair: [CubeEdge, CubeEdge]
}




export type ValidConnection = {
    valid: boolean,
    edge: CubeDirection,
    connectedTo: CubeEdge
   
}