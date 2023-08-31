import { create } from 'zustand'

/**
 * AppStateStore
 *
 * This store is used to store the state of the app/game.
 * The state can vary from app to app and is defined by the generic type T.
 * The generic type T must extend the AppStateBase interface to ensure that cubeid, isRunning and timestamp are available.
 * The cubeId is used to identify the state of the app.
 *
 * * The store is not yet used in the app. It needs some research how it can be used.
 */

interface AppStateBase {
  cubeId: string
  isRunning: boolean
  timestamp: string
}

export interface AppStateStore<T extends AppStateBase> {
  appState: T[]
  addAppState: (item: T) => void
  updateAppState: (item: T) => void
  findAppState: (cubeId: string) => T | undefined
  existsAppState: (cubeId: string) => boolean
}

export const useAppStateStore = <T extends AppStateBase>() =>
  create<AppStateStore<T>>()((set, get) => ({
    appState: [],
    addAppState: (item: T) => {
      set((state) => ({ appState: [...state.appState, item] }))
    },
    updateAppState: (updatedItem: T) => {
      set((state) => ({
        appState: state.appState.map((item) => (item.cubeId === updatedItem.cubeId ? updatedItem : item))
      }))
    },
    findAppState: (cubeId: string) => {
      const currentState = get()
      const foundItem = currentState.appState.find((item) => item.cubeId === cubeId)
      return foundItem
    },
    existsAppState: (cubeId: string) => {
      const currentState = get()
      const foundItem = currentState.appState.find((item) => item.cubeId === cubeId)
      return foundItem !== undefined ? true : false
    }
  }))
