import React, { useEffect, useState } from 'react'

import Button from '../Button/Button'
import './header.css'

import logoSmile from '../../stories/assets/logo-dentist.png'

interface HeaderProps {
  onLogin?: () => void
  onLogout?: () => void
  onCreateAccount?: () => void
}

const Header = ({ onLogin, onLogout, onCreateAccount }: HeaderProps): any => {
  const [user, setUser] = useState('')

  useEffect(() => {
    const getUserFromLocal = localStorage.getItem('user')
    if (getUserFromLocal === null) return
    const { name } = JSON.parse(getUserFromLocal)
    setUser(name)
  }, [])

  return (
    <header>
      <div className="wrapper">
        <div>
          <img src={ logoSmile } alt="logo-smile" style={{ width: '50px' }}/>
          <h1>
            <span style={{ color: '#1ea7fd' }}>SMI</span>
            LE
          </h1>
        </div>
        <div>
          {(
            user.length > 0)
            ? (
            <>
              <span className="welcome">
                Bem-vindo, <b>{ user }</b>!
              </span>
              <Button size="small" onClick={ onLogout } label="Sair" />
            </>
              )
            : (
            <>
              <Button
                size="small"
                onClick={ onLogin }
                label="Entrar"
              />
              <Button
                primary
                size="small"
                onClick={onCreateAccount}
                label="Cadastrar"
              />
            </>
              )}
        </div>
      </div>
    </header>
  )
}

export default Header
