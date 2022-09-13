import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { ICalendar } from '../../interfaces/calendar.interface'

const initialState: ICalendar = {
  firstDayOfMonth: dayjs().startOf('month').toString(),
  actualMonth: dayjs().month(),
  actualYear: dayjs().year()
}

export const calendarSlice = createSlice({
  name: 'CalendarSlice',
  initialState,
  reducers: {
    includeMonthIndex: (state) => {
      if (state.actualMonth > 12) {
        state.actualMonth = 1
        state.actualYear = +state.actualYear + 1
      }
      state.actualMonth = +state.actualYear + 1
    },
    reduceMonthIndex: (state) => {
      if (state.actualMonth < 1) {
        state.actualMonth = 12
        state.actualYear -= 1
      }
      state.actualMonth -= 1
    },
    resetMonthIndex: (state) => {
      state.actualMonth = dayjs().month()
    }
  }
})

export const {
  includeMonthIndex,
  reduceMonthIndex,
  resetMonthIndex
} = calendarSlice.actions

export default calendarSlice.reducer
