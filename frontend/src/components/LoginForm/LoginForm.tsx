/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, CSSProperties, useEffect } from 'react'
import { ILogin, IPropsLogin } from '../../interfaces/login.interface'
import loginInitialState from '../../data/Login.data'
import { Link, useNavigate } from 'react-router-dom'
import TextInput from '../../stories/TextInput/TextInput'
import loginFormStyles from './loginForm.styles'
import { useMediaQuery } from '@mui/material'
import Button from '../../stories/Button/Button'
import useFormValidation from '../../FormValidation/useFormValidation'
import { getAxiosRole, postAxiosInfoData } from '../../services/axios/api'

const LoginForm: React.FC<IPropsLogin> = (props) => {
  const [userLogin, setUserLogin] = useState(loginInitialState)
  const [verifyInputType, setVerifyInputType] = useState(true)
  const [verifyLogin, setVerifyLogin] = useState(false)

  const { validateError, handleErrorMessage } = useFormValidation<ILogin>('register')

  const matches = useMediaQuery('(min-width:600px)')

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.clear()
  }, [])

  const verifyMediaSize = (): CSSProperties | any => matches
    ? loginFormStyles.formDesk
    : loginFormStyles.formCell

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setUserLogin({
      ...userLogin,
      [name]: value
    })
    props.onHandleChange(value)
  }

  const onHandleCheck = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target
    setUserLogin({
      ...userLogin,
      [name]: checked
    })
    setVerifyInputType(!verifyInputType)
    props.onHandleCheck(checked)
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    props.onSubmit(userLogin)
  }

  const sendToLink = (role: string): void => {
    switch (role) {
      case 'admin':
        navigate('/home')
        break
      case 'user':
        navigate('/home')
        break
      case 'client':
        navigate('/client')
        break
      default:
        navigate('/client')
        break
    }
  }

  const handleClick = async (): Promise<any> => {
    await validateError(userLogin)
    const { email, password } = userLogin
    const data = { email, password }
    const postAxiosInfo = await postAxiosInfoData(data)
    if (
      (Boolean((postAxiosInfo?.message?.includes('400')))) ||
      (Boolean((postAxiosInfo?.message?.includes('401'))))
    ) {
      setVerifyLogin(true)
      return
    }
    const { token, name } = postAxiosInfo.data
    const user = { token, name }
    const getAxiosInfo = await getAxiosRole(token)
    const { role } = getAxiosInfo.data
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('role', role)
    sendToLink(role)
  }

  return (
    <section style={ loginFormStyles.container }>
      <form
        data-testid="login-form"
        style={ verifyMediaSize() }
        onSubmit={handleSubmit}
      >
        <TextInput
          dataTestId="login-input-email"
          label="Email"
          type="email"
          name="email"
          styleArticle={ loginFormStyles.styleArticle }
          style={ loginFormStyles.styleInput }
          value={ userLogin.email }
          onChange={ onHandleChange }
          { ...handleErrorMessage('email', 'Insira o email') }
        />

        <TextInput
          dataTestId="login-input-password"
          label="Senha"
          type={ verifyInputType ? 'password' : 'text' }
          name="password"
          styleArticle={ loginFormStyles.styleArticle }
          style={ loginFormStyles.styleInput }
          value={ userLogin.password }
          onChange={ onHandleChange }
          { ...handleErrorMessage('password') }
        />

        <article style={ loginFormStyles.verifyPasswordBox }>
          <label
            style={ loginFormStyles.verifyPassword }
            htmlFor="login-input-verify-password"
          >
            <input
              data-testid="login-input-verify-password"
              name="verifyPassword"
              type="checkbox"
              checked={ userLogin.verifyPassword }
              onChange={ onHandleCheck }
            />
            Verificar password
          </label>
        </article>

        <label
          htmlFor="login-input-remember"
          style={ loginFormStyles.inputRemember }
        >
          <input
            data-testid="login-input-remember"
            name="shouldRemember"
            type="checkbox"
            checked={ userLogin.shouldRemember }
            onChange={ onHandleCheck }
          />
          Lembrar-me
        </label>

        <Button
          primary
          type="submit"
          data-testid="login-button-submit"
          style={{ width: '60%' }}
          label="Entrar"
          onClick={ handleClick }
        />
        {
          verifyLogin && <p style={ loginFormStyles.verify }>
            Email ou senha inválido.
          </p>
        }
        <article style={ loginFormStyles.linkBox }>
          <h4 style={ loginFormStyles.linkText }>Não tem uma conta?</h4>
          <Link to="/register" style={ loginFormStyles.link }>Cadastre-se</Link>
        </article>
      </form>
    </section>
  )
}

export default LoginForm
