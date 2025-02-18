import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const PostContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;
    border-radius: 20px;
    background-color: #e1ddff; 
    padding: 20px;
  }

  form * {
    border-radius: 20px;
    padding: 10px;
  }

  input { 
  width: 70%;
  }

  textarea {
    width: 70%;
    height: 60%;
  }
`

const SubmitButton = styled.button`

`

export default function CreatePost() {
  const navigate = useNavigate()

  const [postData, setPostData] = useState({
    title: '',
    content: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      const response = await axios.post(`http://localhost:3000/api/posts/new`,
        postData,
        {headers}
      )
      navigate('/')
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setPostData({...postData, [name] : value})
  }

  return (
    <PostContainer>
      <form onSubmit={handleSubmit }>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title"
          value={postData.title}
          onChange={handleChange}
        />
        <label htmlFor="content">Content:</label>
        <textarea name="content" id="content"
          value={postData.content}
          onChange={handleChange}
        ></textarea>
        <SubmitButton type='submit'>Create</SubmitButton>
      </form>
    </PostContainer>
  )
}
