import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginForm = () => {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(true)

  const userSignIn = useSelector((state) => state.userSignIn)
  const { user } = userSignIn

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  return (
    <BoxContainer>
      <div className="form-container">
        <h2>START SCHEDULE YOUR MASTER PLAN</h2>
        <h1>
          {isRegister ? 'Login to your account' : 'Create new account'}
          <span>.</span>
        </h1>

        <h3>
          {isRegister ? "Don't Have Account?" : 'Already Have Account?'}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Register' : 'Log In'}
          </span>
        </h3>

        <div className="login-box">
          <div className="input-item">
            <input type="email" />
            <span>Email</span>
          </div>
          <div className="input-item">
            <input type="password" />
            <span>Password</span>
          </div>
          <div className="login-btn register-btn btn">Login</div>
        </div>
      </div>
      <div className="banner-container"></div>
    </BoxContainer>
  )
}

const BoxContainer = styled.div`
  ${tw``}

  .form-container {
    ${tw``}
  }

  .banner-container {
    ${tw``}
  }
`

export default LoginForm
