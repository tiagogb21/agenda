import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IDay } from '../../interfaces/day.interface'

const initialState: IDay = {
  daySelected: null
}

export const Day = createSlice({
  name: 'Day',
  initialState,
  reducers: {
    getDay: (state, action: PayloadAction<any>) => {
      state.daySelected = action.payload
    },
    insertIntoDaySelected: (state, action: PayloadAction<any>) => {
      state.daySelected = [...state.daySelected, action.payload]
    }
  }
})

export const { getDay, insertIntoDaySelected } = Day.actions
export default Day.reducer
