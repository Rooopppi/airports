import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import flightSliceReducer from './redux/slices/flightSlice'

const rootReducer = combineReducers({
  flights: flightSliceReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
