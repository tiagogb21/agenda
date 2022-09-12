import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ILabels } from '../../interfaces/labels.interface'

const initialState: ILabels = {
  labels: []
}

export const LabelSlice = createSlice({
  name: 'LabelSlice',
  initialState,
  reducers: {
    addToLabels: (state, action: PayloadAction<any>) => {
      state.labels = [...state.labels, action.payload]
    },
    updateLabels: (state, action: PayloadAction<any>) => {
      state.labels = [...state.labels, action.payload]
    }
  }
})

export const { addToLabels } = LabelSlice.actions
export default LabelSlice.reducer
