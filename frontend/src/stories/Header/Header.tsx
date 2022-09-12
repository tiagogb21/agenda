import React from 'react'

import Button from '../Button/Button'
import './header.css'

import logoSmile from '../../stories/assets/logo-dentist.png'

interface User {
  name: string
}

interface HeaderProps {
  user?: User
  onLogin?: () => void
  onLogout?: () => void
  onCreateAccount?: () => void
}

const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps): any => (
  <header>
    <div className="wrapper">
      <div>
        <img src={ logoSmile } alt="logo-smile" style={{ width: '50px' }}/>
        <h1>SMILE</h1>
      </div>
      <div>
        {(user != null)
          ? (
          <>
            <span className="welcome">
              Welcome, <b>{user.name}</b>!
            </span>
            <Button size="small" onClick={onLogout} label="Log out" />
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

export default Header
