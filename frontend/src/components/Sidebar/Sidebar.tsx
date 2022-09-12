import React from 'react'
import SmallCalendar from '../SmallCalendar/SmallCalendar'
import Labels from '../Labels/Labels'
import Button from '../../stories/Button/Button'
import { useAppDispatch } from '../../redux/store/store'
import { toggleEventModal } from '../../redux/reducers/eventModal'

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleClick = (): void => {
    dispatch(toggleEventModal(true))
  }

  return (
    <aside className="border p-5 w-64">
      <Button
        label="Criar"
        onClick={ handleClick }
      />
      <SmallCalendar />
      <Labels />
    </aside>
  )
}

export default Sidebar
