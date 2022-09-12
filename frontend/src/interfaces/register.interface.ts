export interface IRegister {
  username: string
  email: string
  password?: string
  verifyPassword?: boolean
}

export interface IPropsRegister {
  onHandleChange: (value: string) => void
  onHandleCheck: (check: boolean) => void
  onSubmit: (login: IRegister) => void
  verifyPassword: boolean
}
