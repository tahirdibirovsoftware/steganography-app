import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, Slice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
type AppNavigation = '/encoder' | '/decoder' | '/processor' | '/result' | '/'
type ProcessType =  'processing' | 'done' | 'suspend' 

interface AppState {
  filePath: string,
  privateMessage: string,
  navigation: AppNavigation
  isProcessing: ProcessType,
  isError: boolean
}

// Define the initial state using that type
const initialState: AppState = {
  filePath: '',
  privateMessage: '',
  navigation: '/',
  isProcessing: 'suspend',
  isError: false
}

export const appSlice:Slice<AppState> = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFilePath: (state, action: PayloadAction<string>) => {
      state.filePath = action.payload
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.privateMessage = action.payload
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setNavigation: (state, action: PayloadAction<AppNavigation>) => {
        state.navigation = action.payload
      },
    setProcessState: (state, action: PayloadAction<ProcessType>)=>{
        state.isProcessing = action.payload
    },

    setError: (state, action: PayloadAction<boolean>)=>{
        state.isError = action.payload
    },

    resetTheState: () => {
      return initialState
    }
  }
})

export const { setFilePath, setMessage, setNavigation, setProcessState, resetTheState, setError } = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const appState = (state: RootState): AppState => state.app
export default appSlice.reducer

