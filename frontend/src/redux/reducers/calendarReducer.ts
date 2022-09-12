import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { ICalendar } from '../../interfaces/calendar.interface'

const initialState: ICalendar = {
  monthIndex: 0,
  setMonthIndex: {}
}

export const calendarSlice = createSlice({
  name: 'CalendarSlice',
  initialState,
  reducers: {
    includeMonthIndex: (state) => {
      state.monthIndex += 1
    },
    reduceMonthIndex: (state) => {
      state.monthIndex -= 1
    },
    resetMonthIndex: (state) => {
      state.monthIndex = state.monthIndex === dayjs().month()
        ? state.monthIndex + Math.random()
        : dayjs().month()
    }
  }
})

export const {
  includeMonthIndex,
  reduceMonthIndex,
  resetMonthIndex
} = calendarSlice.actions

export default calendarSlice.reducer
