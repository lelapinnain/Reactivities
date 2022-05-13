import { createContext, useContext } from 'react'
import ActivityStore from './activityStore'
import CommonStore from './commonStore'

interface Store {
  acitivityStore: ActivityStore
  commonStore: CommonStore
}

export const store: Store = {
  acitivityStore: new ActivityStore(),
  commonStore: new CommonStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
  return useContext(StoreContext)
}
