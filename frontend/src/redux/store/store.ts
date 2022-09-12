import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import scheduleLogin from '../reducers/loginReducers'
import scheduleRegister from '../reducers/registerReducers'
import scheduleAside from '../reducers/asideReducers'
import scheduleTable from '../reducers/tableReducers'
import scheduleCalendar from '../reducers/calendarReducer'
import scheduleEventModal from '../reducers/eventModal'
import scheduleDay from '../reducers/dayReducer'
import scheduleLabels from '../reducers/labelReducer'
import scheduleSmallCallendarMonth from '../reducers/smallCallendarMonthReducer'

export const store = configureStore({
  reducer: {
    aside: scheduleAside,
    calendar: scheduleCalendar,
    day: scheduleDay,
    eventModal: scheduleEventModal,
    labels: scheduleLabels,
    login: scheduleLogin,
    register: scheduleRegister,
    smallCallendarMonth: scheduleSmallCallendarMonth,
    table: scheduleTable
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
