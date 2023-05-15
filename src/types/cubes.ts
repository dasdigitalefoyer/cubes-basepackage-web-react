export type CubeState = {
  timestamp: string
  meta: {
    version: string
  }
  id: string
  state: string
  system: {
    ip: string
    mac: string
    hostname: string
  }
  cubeControl: {
    timestamp: string
    meta: {
      version: string
    }
    position: {
      x: number
      y: number
    }
    orientation: number
    velocity: {
      x: number
      y: number
    }
  }
}
