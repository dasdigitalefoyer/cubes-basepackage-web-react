import { create } from 'zustand'

export interface AppStateStore<T extends { cubeId: string }> {
  appState: T[]
  addAppState: (item: T) => void
  updateAppState: (item: T) => void
  findAppState: (predicate: (item: T) => boolean) => T | undefined
  existsAppState: (cubeId: string) => boolean
}

export const useAppStateStore = <T extends { cubeId: string }>() =>
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
    findAppState: (predicate: (item: T) => boolean) => {
      const currentState = get() // Get the current state
      const foundItem = currentState.appState.find(predicate)
      return foundItem !== undefined ? foundItem : undefined
    },
    existsAppState: (cubeId: string) => {
      const currentState = get() // Get the current state
      const foundItem = currentState.appState.find((item) => item.cubeId === cubeId)
      return foundItem !== undefined ? true : false
    }
  }))
