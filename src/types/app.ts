enum AppCategory {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export type AppState = {
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
  active: boolean
  miscData?: object
}
