/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { CSSProperties, useState } from 'react'
import { IPropsRegister, IRegister } from '../../interfaces/register.interface'
import registerInitialState from '../../data/Register.data'
import TextInput from '../../stories/TextInput/TextInput'
import registerFormStyles from './registerForm.styles'
import Button from '../../stories/Button/Button'
import { useMediaQuery } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import useFormValidation from '../../FormValidation/useFormValidation'
import { postAxiosInfoDataRegister } from '../../services/axios/api'

const RegisterForm: React.FC<IPropsRegister> = (props) => {
  const [userRegister, setUserRegister] = useState(registerInitialState)
  const [userAlreadyExists, setUserAlreadyExists] = useState(false)

  const { validateError, handleErrorMessage } = useFormValidation<IRegister>('register')

  const matches = useMediaQuery('(min-width:600px)')

  const verifyMediaSize = (): CSSProperties | any => matches
    ? registerFormStyles.formDesk
    : registerFormStyles.formCell

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setUserRegister({
      ...userRegister,
      [name]: value
    })
    props.onHandleChange(value)
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    props.onSubmit(userRegister)
  }

  const navigate = useNavigate()

  const handleClick = async (): Promise<void> => {
    await validateError(userRegister)
    const { username, email, password } = userRegister
    const postAxiosInfo = await postAxiosInfoDataRegister({
      name: username,
      email,
      password,
      role: 'client'
    })
    if (
      (Boolean((postAxiosInfo?.message?.includes('400')))) ||
      (Boolean((postAxiosInfo?.message?.includes('401'))))
    ) {
      setUserAlreadyExists(true)
      return
    }
    localStorage.setItem('user', JSON.stringify(postAxiosInfo.data))
    navigate('/client')
  }

  return (
    <section style={ registerFormStyles.container }>
      <form
        data-testid="register-form"
        onSubmit={handleSubmit}
        style={ verifyMediaSize() }
      >
        <TextInput
          dataTestId="register-input-username"
          label="Nome"
          type="text"
          name="username"
          styleArticle={ registerFormStyles.styleArticle }
          style={ registerFormStyles.styleInput }
          value={ userRegister.username }
          onChange={ onHandleChange }
          { ...handleErrorMessage('name') }
        />
        <TextInput
          dataTestId="register-input-email"
          label="Email"
          type="email"
          name="email"
          styleArticle={ registerFormStyles.styleArticle }
          style={ registerFormStyles.styleInput }
          value={ userRegister.email }
          onChange={ onHandleChange }
          { ...handleErrorMessage('email', 'Insira o email') }
        />
        <TextInput
          dataTestId="register-input-password"
          label="Senha"
          type="password"
          name="password"
          styleArticle={ registerFormStyles.styleArticle }
          style={ registerFormStyles.styleInput }
          value={ userRegister.password }
          onChange={ onHandleChange }
          { ...handleErrorMessage('password') }
        />
        <Button
          primary
          type="submit"
          label="Entrar"
          style={{ width: '60%' }}
          data-testid="register-button-submit"
          onClick={ handleClick }
        />
        {
          userAlreadyExists &&
          (
            <p style={ registerFormStyles.verify }>Usuário já existente</p>
          )
        }
        <article style={ registerFormStyles.linkBox }>
          <h4 style={ registerFormStyles.linkText }>Já tem uma conta?</h4>
          <Link to="/login" style={ registerFormStyles.link }>Faça login</Link>
        </article>
      </form>
    </section>
  )
}

export default RegisterForm
