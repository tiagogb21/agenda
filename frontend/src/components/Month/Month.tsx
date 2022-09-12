import React from 'react'
import _Day from '../Day/Day'

interface IT {
  day: any
  key: number
  rowIdx: number
}

const Day = _Day as unknown as React.JSXElementConstructor<{
  day: string[]
  rowIdx: number
}>

const Month: React.FC = (props: any) => {
  const { month } = props
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {
        month?.map((row: any, i: number) => (
          <React.Fragment key={i}>
            {row.map((day: IT, idx: number) => (
              <Day day={ day.day } key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
    </div>
  )
}

export default Month
