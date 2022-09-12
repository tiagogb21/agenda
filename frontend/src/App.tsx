import React from 'react'
import { useNavigate } from 'react-router-dom'
import PathRouter from './PathRouter'
import Header from './stories/Header/Header'

const App: React.FC = () => {
  const navigate = useNavigate()

  const onLogin = (): void => {
    navigate('/login')
  }

  const onLogout = (): void => {
    localStorage.clear()
    navigate('/login')
  }

  const onCreateAccount = (): void => {
    navigate('/register')
  }

  return (
    <>
      <Header
        onLogin={ onLogin }
        onCreateAccount={ onCreateAccount }
        onLogout={ onLogout }
      />
      <PathRouter />
    </>
  )
}

export default App
