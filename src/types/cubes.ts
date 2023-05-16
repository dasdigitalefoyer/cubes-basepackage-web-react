enum AppCategory {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

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

export type CubeAppState = {
  timestamp: Date
  meta: {
    version: string
  }
  id: string
  category: AppCategory
  name: string
  description: string
  version: string
  rootPath: string
  webResourcePath?: string
  webRoot: string
  clientAppRoot: string
  clientAppType: string
  // clientAppPath: string = "<CLIENT_APP_PATH>" # executable or webroot
  active: boolean
  miscData?: object
}
