import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IRegister } from '../../interfaces/register.interface'

const initialState: IRegister = {
  username: '',
  email: '',
  password: ''
}

export const RegisterSlice = createSlice({
  name: 'RegisterSlice',
  initialState,
  reducers: {
    addNameToRegister: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    addEmailToRegister: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    addPasswordToRegister: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    }
  }
})

export const {
  addNameToRegister,
  addEmailToRegister,
  addPasswordToRegister
} = RegisterSlice.actions
export default RegisterSlice.reducer
