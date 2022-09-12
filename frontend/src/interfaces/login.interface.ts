export interface ILogin {
  email: string
  password: string
  verifyPassword?: boolean
  shouldRemember?: boolean
}

export interface IPropsLogin {
  onHandleChange: (value: string) => void
  onHandleCheck: (check: boolean) => void
  onSubmit: (login: ILogin) => void
  verifyPassword: boolean
  shouldRemember: boolean
}
