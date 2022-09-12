import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ISmallCalendarMonth } from '../../interfaces/smallCalendarMonth.interface'

const initialState: ISmallCalendarMonth = {
  smallCalendarMonth: []
}

export const SmallCalendarMonthSlice = createSlice({
  name: 'SmallCalendarMonthSlice',
  initialState,
  reducers: {
    insetIntoSmallCalendarMonth: (state, action: PayloadAction<any>) => {
      state.smallCalendarMonth = [...state.smallCalendarMonth, action.payload]
    }
  }
})

export const { insetIntoSmallCalendarMonth } = SmallCalendarMonthSlice.actions
export default SmallCalendarMonthSlice.reducer
