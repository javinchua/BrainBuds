import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
interface AppState {
  addressUsernameMap: Record<string, string>
  productNameMap: Record<string, string>
}

const initialState: AppState = {
  addressUsernameMap: {},
  productNameMap: {}
}

interface SetUsernameAction extends AnyAction {
  type: 'SET_USERNAME'
  data: Record<string, string>
}

interface SetProductNameAction extends AnyAction {
  type: 'SET_PRODUCT_NAME'
  data: Record<string, string>
}

interface ResetAction extends AnyAction {
  type: 'RESET'
}

type AppAction = SetUsernameAction | SetProductNameAction | ResetAction

const addressUsernameReducer = (
  state: Record<string, string> = initialState.addressUsernameMap,
  action: AppAction
) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return action.data
    case 'RESET':
      return initialState.addressUsernameMap
    default:
      return state
  }
}

const productNameReducer = (
  state: Record<string, string> = initialState.productNameMap,
  action: AppAction
) => {
  switch (action.type) {
    case 'SET_PRODUCT_NAME':
      return action.data
    case 'RESET':
      return initialState.productNameMap
    default:
      return state
  }
}

const rootReducer = combineReducers({
  addressUsernameMap: addressUsernameReducer,
  productNameMap: productNameReducer
})
const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureAppStore = (preloadedState = initialState) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  })

  const persistor = persistStore(store)

  return { store, persistor }
}

export default configureAppStore
export type RootState = ReturnType<typeof rootReducer>
