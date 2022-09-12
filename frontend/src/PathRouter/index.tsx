import React from 'react'
import {
  Routes,
  Route
} from 'react-router-dom'
import LoginForm from '../components/LoginForm/LoginForm'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import Home from '../pages/Home/Home'

const noop = (): void => {}

const PathRouter: React.FC = () => {
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
    </Routes>
  )
}

export default PathRouter
