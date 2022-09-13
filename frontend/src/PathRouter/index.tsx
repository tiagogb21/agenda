import React, { useEffect, useState } from 'react'
import {
  Routes,
  Route
} from 'react-router-dom'
import LoginForm from '../components/LoginForm/LoginForm'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import Admin from '../pages/Admin/Admin'
import Calendar from '../pages/Calendar/Calendar'
import Home from '../pages/Home/Home'
import Page404 from '../pages/Page404/Page404'

const noop = (): void => {}

const PathRouter: React.FC = () => {
  const [user, setUser] = useState('')

  useEffect(() => {
    const getUserFromLocal = localStorage.getItem('user')
    if (getUserFromLocal == null) return
    const { name } = JSON.parse(getUserFromLocal)
    setUser(name.toLowerCase())
  }, [])

  console.log(user)

  return (
    <Routes>
      <Route path="/" element={ <LoginForm
        onHandleChange={ noop }
        onHandleCheck={ noop }
        onSubmit={ noop }
        shouldRemember={ true }
        verifyPassword={ true }
      /> } />
      <Route path="/login" element={ <LoginForm
        onHandleChange={ noop }
        onHandleCheck={ noop }
        onSubmit={ noop }
        shouldRemember={ true }
        verifyPassword={ true }
      /> } />
      <Route path="/register" element={ <RegisterForm
        onHandleChange={ noop }
        onHandleCheck={ noop }
        onSubmit={ noop }
        verifyPassword={ true }
      /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="/calendar" element={ <Calendar /> } />
      <Route path="/client" element={ <Home /> } />
      <Route path="/admin" element={ <Admin /> } />
      <Route path="*" element={ <Page404 /> } />
    </Routes>
  )
}

export default PathRouter
