import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import { getDay } from '../../redux/reducers/dayReducer'
import { inserIntoSelectedEvent, toggleEventModal } from '../../redux/reducers/eventModal'
import { useAppSelector } from '../../redux/store/hooks'
import { useAppDispatch } from '../../redux/store/store'

interface IEvt {
  label: string
  title: string
}

const Day: React.FC = (props: any) => {
  const { day, rowIdx } = props
  const [dayEvents, setDayEvents] = useState([])

  const { filteredEvents } = useAppSelector((state) => state.eventModal)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt: any) =>
        dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    )
    setDayEvents(events)
  }, [filteredEvents, day])

  const getCurrentDayClass = (): string => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : ''
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${
            getCurrentDayClass()
          }`}
        >
          {day.format('DD')}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          dispatch(getDay(day))
          dispatch(toggleEventModal(true))
        }}
      >
        {dayEvents.map((evt: IEvt, idx) => (
          <div
            key={idx}
            onClick={() => dispatch(inserIntoSelectedEvent(evt))}
            className={
              `bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`
            }
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Day
