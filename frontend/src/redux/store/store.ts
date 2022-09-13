import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import scheduleLogin from '../reducers/loginReducers'
import scheduleRegister from '../reducers/registerReducers'
import scheduleAside from '../reducers/asideReducers'
import scheduleTable from '../reducers/tableReducers'
import scheduleCalendar from '../reducers/calendarReducer'
import scheduleCalculator from '../reducers/calculatorReducer'

export const store = configureStore({
  reducer: {
    aside: scheduleAside,
    calendar: scheduleCalendar,
    login: scheduleLogin,
    register: scheduleRegister,
    table: scheduleTable,
    calculator: scheduleCalculator
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
