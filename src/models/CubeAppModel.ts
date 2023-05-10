export enum AppType {
  WEB = 'WEB',
  EXECUTABLE = 'EXECUTABLE',
}

export enum AppCategory {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type CubeAppModel = {
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
