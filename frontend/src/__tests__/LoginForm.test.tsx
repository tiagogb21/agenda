import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { ILogin, IPropsLogin } from '../interfaces/login.interface'
import { BrowserRouter as Router } from 'react-router-dom'
import LoginForm from '../components/LoginForm/LoginForm'

export const renderLoginForm = (props: Partial<IPropsLogin> = {}): any => {
  const defaultProps: IPropsLogin = {
    onHandleChange (_value: string) {
    },
    onHandleCheck (_check: boolean) {
    },
    onSubmit (_login: ILogin) {
    },
    verifyPassword: false,
    shouldRemember: true
  }
  return render(
    <Router>
      <LoginForm { ...defaultProps } { ...props } />
    </Router>
  )
}

describe('<LoginForm />', () => {
  test(`Deve exibir um formulário de login em branco:
    a - com um 'verify password' desmarcado por padrão e
    b - com um 'remember me' marcado por padrão`, async () => {
    const { findByTestId } = renderLoginForm()

    const loginForm = await findByTestId('login-form')

    expect(loginForm).toHaveFormValues({
      email: '',
      password: '',
      verifyPassword: false,
      shouldRemember: true
    })
  })

  test('Deve permitir a entrada de um email de usuário', async () => {
    const onHandleChange = jest.fn()

    const { getByTestId } = renderLoginForm({ onHandleChange })

    const emailInput = await getByTestId('login-input-email').querySelector('input')

    // const emailInput = await findByRole('textbox')
    console.log(emailInput)

    // fireEvent(node: HTMLElement, event: Event)
    fireEvent.change(emailInput, { target: { value: 'user@user.com' } })

    expect(onHandleChange).toHaveBeenCalledWith('user@user.com')
  })

  test('Deve permitir a entrada de um password de usuário', async () => {
    const onHandleChange = jest.fn()
    const { getByTestId } = renderLoginForm({ onHandleChange })
    const password = await getByTestId('login-input-password').querySelector('input')

    fireEvent.change(password, { target: { value: 'password' } })

    expect(onHandleChange).toHaveBeenCalledWith('password')
  })

  test('Deve permitir alternar a opção remember me', async () => {
    const onHandleCheck = jest.fn()
    const { findByTestId } = renderLoginForm({
      onHandleCheck,
      shouldRemember: true
    })
    const remember = await findByTestId('login-input-remember')

    fireEvent.click(remember)

    expect(onHandleCheck).toHaveBeenCalledWith(false)

    fireEvent.click(remember)

    expect(onHandleCheck).toHaveBeenCalledWith(true)
  })

  test(`Deve permitir enviar o form com as propriedades username,
  password, and remember`, async () => {
    const onSubmit = jest.fn()
    const { findByTestId, getByTestId } = renderLoginForm({
      onSubmit,
      shouldRemember: false
    })
    const email = await getByTestId('login-input-email').querySelector('input')
    const password = await getByTestId('login-input-password').querySelector('input')
    const verifyPassword = await findByTestId('login-input-verify-password')
    const remember = await findByTestId('login-input-remember')
    const submit = await findByTestId('login-button-submit')

    fireEvent.change(email, { target: { value: 'test' } })
    fireEvent.change(password, { target: { value: 'password' } })
    fireEvent.click(verifyPassword)
    fireEvent.click(remember)
    fireEvent.click(submit)

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test',
      password: 'password',
      shouldRemember: false,
      verifyPassword: true
    })
  })
})
