import { create } from 'zustand'

enum AppCategory {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export type CubeApp = {
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
  miscData: object
}

type CubeAppStore = {
  cubeApp: CubeApp | null
  setCubeApp: (cubeApp: CubeApp) => void
}

export const useCubeAppStore = create<CubeAppStore>((set) => ({
  cubeApp: null,
  setCubeApp: (cubeApp) => set(() => ({ cubeApp }))
}))
