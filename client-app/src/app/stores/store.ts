import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store {
    acitivityStore:ActivityStore
}

export const store:Store ={
    acitivityStore:new ActivityStore()
}

export const StoreContext = createContext(store)

export function useStore(){
    return useContext(StoreContext)
}