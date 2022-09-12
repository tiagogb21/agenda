import React, { useState, useEffect } from 'react'
import getMonth from '../../data/day'
import CalendarHeader from '../../components/CalendarHeader/CalendarHeader'
import Sidebar from '../../components/Sidebar/Sidebar'
import _Month from '../../components/Month/Month'
import EventModal from '../../components/EventModal/EventModal'
import { useAppSelector } from '../../redux/store/hooks'

const Month = _Month as unknown as React.JSXElementConstructor<{
  month: string
}>

const Calendar: React.FC = () => {
  const [currenMonth, setCurrentMonth] = useState(getMonth())

  const { monthIndex } = useAppSelector((state) => state.calendar)

  const { showEventModal } = useAppSelector((state) => state.eventModal)

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Calendar
