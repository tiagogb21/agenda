import React from 'react'
import dayjs from 'dayjs'
import { useAppSelector } from '../../redux/store/hooks'
import logo from '../assets/logo.png'
import { useAppDispatch } from '../../redux/store/store'
import {
  includeMonthIndex,
  reduceMonthIndex,
  resetMonthIndex
} from '../../redux/reducers/calendarReducer'

const CalendarHeader: React.FC = () => {
  const { monthIndex } = useAppSelector((state) => state.calendar)

  const dispatch = useAppDispatch()

  const handlePrevMonth = (): void => {
    dispatch(includeMonthIndex())
  }

  const handleNextMonth = (): void => {
    dispatch(reduceMonthIndex())
  }

  const handleReset = (): void => {
    dispatch(resetMonthIndex())
  }

  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">
        Calendar
      </h1>
      <button
        onClick={handleReset}
        className="border rounded py-2 px-4 mr-5"
      >
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          'MMMM YYYY'
        )}
      </h2>
    </header>
  )
}

export default CalendarHeader
