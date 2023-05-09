export interface ICubeMqttService {
  publishToAllCubes(message: string): void
  publishToCube(cubeId: string, message: string): void
}

/**
 *
 */
export class CubeMqttService implements ICubeMqttService {
  /**
   *
   */
  publishToAllCubes(message: string): void {
    throw new Error('Method not implemented.')
  }
  publishToCube(cubeId: string, message: string): void {
    throw new Error('Method not implemented.')
  }
}
