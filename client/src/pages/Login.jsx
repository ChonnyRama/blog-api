import React, { useState } from 'react'
import styled from 'styled-components'
import useFetchData from '../hooks/use-fetch-data'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const LoginForm = styled.form`
  position: relative;
  top: -20vh;
  background-color: #d0c9ff;
  padding: 20px 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  h2 {
    font-size: 1.7rem;
    margin: 0;
  }

  input {
    font-size: 1.2rem;
    padding-left: 15px;
  }
`

const StyledLabel = styled.label`
  display: block;
`

const LoginButton = styled.button`
  margin: 10px 0;

`

const RegisterContainer = styled.div`


  span {
    font-size: .9rem;
  }
`

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const {login} = useAuth()

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/sessions/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const {token} = await response.json()
        login(token)
        console.log("Login succesful")
        navigate('/')
      } else {
        console.log("login failed")
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }



  return (
    <LoginContainer>
      <LoginForm className='login-form' onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        <StyledLabel htmlFor="username"></StyledLabel>
        <input type="text" id="username" name="username" placeholder='Username'
          onChange={handleChange}
          value={formData.username}
          required
        />
        <StyledLabel htmlFor='password'></StyledLabel>
        <input type="password" name="password" id="password" placeholder='Password'
          onChange={handleChange}
          value={formData.password}
          required
        />
        <LoginButton type="submit">Login</LoginButton>
        <RegisterContainer>
          <span>Or sign up now</span>
        </RegisterContainer>
      </LoginForm>
    </LoginContainer>
  )
}
