import React, { useEffect } from 'react'
import { sumAll } from '../../redux/reducers/tableReducers'
import { useAppSelector } from '../../redux/store/hooks'
import { useAppDispatch } from '../../redux/store/store'

// import { Container } from './styles';

const Admin: React.FC = () => {
  const { total } = useAppSelector((state) => state.table)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(sumAll())
  }, [])

  return (
    <>
      <h2>Faturamento</h2>
      {
        (total !== 0) && <p>R$ {total}</p>
      }
    </>
  )
}

export default Admin
