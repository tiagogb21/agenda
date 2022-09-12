import React from 'react'
import { useAppSelector } from '../../redux/store/hooks'
import { DataGrid } from '@mui/x-data-grid'
import { columns } from '../../data/columns.data'
import tableScheduleStyles from './TableSchedule.styles'

// import { Container } from './styles';

const TableSchedule: React.FC = () => {
  const { schedules } = useAppSelector((state) => state.table)

  return (
    <div
      style={ tableScheduleStyles.container }
    >
      <div
        style={{ display: 'flex', height: '300px', width: '90%', alignItems: 'center' }}
      >
        <DataGrid
          columns={ columns }
          rows={ schedules }
          pageSize={ 5 }
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default TableSchedule
