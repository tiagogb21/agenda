import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ITable, TableState } from '../../interfaces/table.interface'
import { scheduleData } from '../../utils/data'

const initialState: TableState = {
  schedules: [scheduleData],
  total: 0
}

export const TableSlice = createSlice({
  name: 'TableSlice',
  initialState,
  reducers: {
    insertDataInSchedule: (state, action: PayloadAction<ITable>) => {
      state.schedules = [...state.schedules, action.payload]
    },
    removeDataFromSchedule: (state, action: PayloadAction<number>) => {
      const getFirstSplice = state.schedules.splice(0, action.payload)
      const getSecondSplice = state.schedules.splice(action.payload)
      state.schedules = [...getFirstSplice, ...getSecondSplice]
    },
    cleanSchedules: (state) => {
      state.schedules = []
    },
    sumAll: (state) => {
      state.total = state.schedules.reduce((acc, curr) => acc + Number(curr.value), 0)
    }
  }
})

export const {
  insertDataInSchedule,
  removeDataFromSchedule,
  cleanSchedules,
  sumAll
} = TableSlice.actions
export default TableSlice.reducer
