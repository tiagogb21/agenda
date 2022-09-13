import dayjs from 'dayjs'
import CalendarSets from 'dayjs-plugin-calendar-sets'

dayjs.extend(CalendarSets)

const calendarDays = (): any => {
  const month = new Date().getMonth()
  return dayjs.calendarSets().month({ month })
}

export default calendarDays
