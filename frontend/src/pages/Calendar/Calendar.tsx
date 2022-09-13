import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import calendarDays from '../../data/day'
import { useAppSelector } from '../../redux/store/hooks'
import { days, months } from '../../utils/data'
import calendarStyles from './calendar.styles'
// import { useAppSelector } from '../../redux/store/hooks'

const calendar = calendarDays()

const Calendar: React.FC = () => {
  const [monthAndYear, setMonthAndYear] = useState('')

  const { actualMonth, actualYear } = useAppSelector((state) => state.calendar)

  const matches = useMediaQuery('(min-width:600px)')

  const verifyMedia = (): CSSProperties => {
    return !matches ? calendarStyles.buttonCell : calendarStyles.buttonDesk
  }

  useEffect(() => {
    const month = months[actualMonth]
    const year = actualYear
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const getMonthAndYear = `${month.toString()} / ${year.toString()}`
    setMonthAndYear(getMonthAndYear)
  }, [])

  console.log(calendar)

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const target = e.target as HTMLTextAreaElement
    target.style.border = '1px solid #1ea7fd'
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const target = e.target as HTMLTextAreaElement
    target.style.border = 'none'
  }

  return (
    <section style={ calendarStyles.container as CSSProperties }>
      <h3>{ monthAndYear }</h3>
      <section style={ calendarStyles.tableContainer }>
        <article
          style={ calendarStyles.lineTable as CSSProperties }
        >
          {
            days.map((day) => (
              <button
                style={ {
                  ...calendarStyles.headerTable as CSSProperties,
                  ...verifyMedia()
                } }
                key={ day }
              >
                { day.slice(0, 3) }
              </button>
            ))
          }
        </article>
        {
          calendar?.map((week: string[], id: number) => (
            <article
              key={ id }
              style={ calendarStyles.lineTable as CSSProperties }
            >
              {
                week?.map((day: string) => (
                  <button
                    style={ {
                      ...calendarStyles.cellTable,
                      ...verifyMedia()
                    } }
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    key={ day }
                  >
                    { day.split('-').reverse()[0] }
                  </button>
                ))
              }
            </article>
          ))
        }
      </section>
    </section>
  )
}

export default Calendar
