import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'createdBy', headerName: 'CRIADO POR', width: 170 },
  { field: 'client', headerName: 'PACIENTE', width: 150 },
  { field: 'value', headerName: 'VALOR', width: 130 },
  { field: 'status', headerName: 'STATUS', width: 150 },
  { field: 'date', headerName: 'DATA', width: 150 },
  { field: 'hour', headerName: 'HORÁRIO', width: 150 }
]
