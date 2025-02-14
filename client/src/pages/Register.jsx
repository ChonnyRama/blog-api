import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const RegisterContainer = styled.div`
  width: 99vw;
  height: 99vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 100px;

`

const RegisterForm = styled.form`
  background-color: #d0c9ff;
  padding: 20px 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  h2 {
    font-size: 1.7rem;
    margin: 0;
  }

  input {
    font-size: 1.2rem;
    padding-left: 15px;
  }

  label {
    align-self: start;
  }
`

const ErrorDiv = styled.form`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 400px;
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin-bottom: 5px;
  }
`

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState([])

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        console.log('Registration succesful')
        navigate('/login', {state: {message: 'Account created! Please log in.'}})
      } else {
        const data = await response.json()
        setErrors(data.errors)
        console.log('Registration failed')
      }
      
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <RegisterContainer>
      {errors.length > 0 && (
        <ErrorDiv>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </ErrorDiv>
      )}
      <RegisterForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" placeholder='Username'
          onChange={handleChange}
          value={formData.username}
        />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder='Email'
          onChange={handleChange}
          value={formData.email}
        />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder='Password'
          onChange={handleChange}
          value={formData.password}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm password'
          onChange={handleChange}
          value={formData.confirmPassword}
        />
        <button style={{marginTop: '20px'}} type="submit">Register</button>
      </RegisterForm>
    </RegisterContainer>
  )
}
