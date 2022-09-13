import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ButtonCloseType } from '../../interfaces/calculator.interface'

const initialState: ButtonCloseType = {
  buttonClose: false
}

export const calculatorSlice = createSlice({
  name: 'ButtonCloseSlice',
  initialState,
  reducers: {
    toggleButton: (state, action: PayloadAction<boolean>) => {
      state.buttonClose = action.payload
    }
  }
})

export const { toggleButton } = calculatorSlice.actions
export default calculatorSlice.reducer
