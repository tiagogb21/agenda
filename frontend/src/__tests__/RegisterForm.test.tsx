import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import RegisterForm from '../components/RegisterForm/RegisterForm'
import { BrowserRouter as Router } from 'react-router-dom'
import { IRegister, IPropsRegister } from '../interfaces/register.interface'

export const renderRegisterForm = (props: Partial<IPropsRegister> = {}): any => {
  const defaultProps: IPropsRegister = {
    onHandleChange (_value: string) {
    },
    onHandleCheck (_check: boolean) {
    },
    onSubmit (_register: IRegister) {
    },
    verifyPassword: false
  }
  return render(
    <Router>
      <RegisterForm { ...defaultProps } { ...props } />
    </Router>
  )
}

describe('<RegisterForm />', () => {
  test(`Deve exibir um formulário de cadastro em branco:
    a - com um 'verify password' desmarcado por padrão e`, async () => {
    const { findByTestId } = renderRegisterForm()

    const registerForm = await findByTestId('register-form')

    expect(registerForm).toHaveFormValues({
      username: '',
      email: '',
      password: '',
      verifyPassword: false
    })
  })

  test('Deve permitir a entrada de um nome de usuário', async () => {
    const onHandleChange = jest.fn()
    const { getByTestId } = renderRegisterForm({ onHandleChange })
    const username = await getByTestId('register-input-username').querySelector('input')

    fireEvent.change(username, { target: { value: 'user' } })

    expect(onHandleChange).toHaveBeenCalledWith('user')
  })

  test('Deve permitir a entrada de um email de usuário', async () => {
    const onHandleChange = jest.fn()

    const { getByTestId } = renderRegisterForm({ onHandleChange })

    const emailInput = await getByTestId('register-input-email').querySelector('input')

    // fireEvent(node: HTMLElement, event: Event)
    fireEvent.change(emailInput, { target: { value: 'user@user.com' } })

    expect(onHandleChange).toHaveBeenCalledWith('user@user.com')
  })

  test('Deve permitir a entrada de uma senha de usuário', async () => {
    const onHandleChange = jest.fn()

    const { getByTestId } = renderRegisterForm({ onHandleChange })

    const passwordInput = await getByTestId('register-input-password')
      .querySelector('input')

    // fireEvent(node: HTMLElement, event: Event)
    fireEvent.change(passwordInput, { target: { value: 'secret_password' } })

    expect(onHandleChange).toHaveBeenCalledWith('secret_password')
  })

  test('Deve enviar o form com username, email, and password', async () => {
    const onSubmit = jest.fn()
    const { findByTestId } = renderRegisterForm({
      onSubmit
    })

    const username = await findByTestId('register-input-username')
    const email = await findByTestId('register-input-email')
    const password = await findByTestId('register-input-password')
    const submit = await findByTestId('register-button-submit')

    fireEvent.change(username, { target: { value: 'user' } })
    fireEvent.change(email, { target: { value: 'user@user.com' } })
    fireEvent.change(password, { target: { value: 'secret_user' } })
    fireEvent.click(submit)

    expect(onSubmit).toHaveBeenCalledWith({
      username: 'user',
      email: 'user@user.com',
      password: 'secret_user',
      verifyPassword: true
    })
  })
})
