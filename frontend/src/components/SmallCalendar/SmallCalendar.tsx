import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useAppSelector } from '../../redux/store/hooks'
import getMonth from '../../data/day'
import { useAppDispatch } from '../../redux/store/store'
import {
  insetIntoSmallCalendarMonth
} from '../../redux/reducers/smallCallendarMonthReducer'
import { insertIntoDaySelected } from '../../redux/reducers/dayReducer'

const SmallCalendar: React.FC = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(
    dayjs().month()
  )

  const [currentMonth, setCurrentMonth] = useState(getMonth())

  const dispatch = useAppDispatch()

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx))
  }, [currentMonthIdx])

  const { monthIndex } = useAppSelector((state) => state.calendar)
  const { daySelected } = useAppSelector((state) => state.day)

  useEffect(() => {
    setCurrentMonthIdx(monthIndex)
  }, [monthIndex])

  const handlePrevMonth = (): void => {
    setCurrentMonthIdx(currentMonthIdx - 1)
  }

  const handleNextMonth = (): void => {
    setCurrentMonthIdx(currentMonthIdx + 1)
  }

  const getDayClass = (day: any): string => {
    const format = 'DD-MM-YY'
    const nowDay = dayjs().format(format)
    const currDay = day.format(format)
    const slcDay = daySelected?.format(format)
    if (nowDay === currDay) {
      return 'bg-blue-500 rounded-full text-white'
    } else if (currDay === slcDay) {
      return 'bg-blue-100 rounded-full text-blue-600 font-bold'
    } else {
      return ''
    }
  }

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
            'MMMM YYYY'
          )}
        </p>
        <div>
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
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day: any, i: number) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((row: any, i: number) => (
          <React.Fragment key={i}>
            {row.map((day: any, idx: number) => (
              <button
                key={idx}
                onClick={() => {
                  dispatch(insetIntoSmallCalendarMonth(currentMonthIdx))
                  dispatch(insertIntoDaySelected(day))
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="text-sm">{day.format('D')}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default SmallCalendar
