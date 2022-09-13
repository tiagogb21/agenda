export interface ITable {
  id?: number | string
  createdBy?: string
  client?: string
  status?: string
  value?: string
  date?: string
}

export interface TableState {
  schedules: ITable[]
  total: number
}

export interface TableAction {
  type: string
  table: ITable
}
