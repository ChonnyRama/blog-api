import React from 'react'
import styled from 'styled-components'
import "react-toggle/style.css"
import Toggle from 'react-toggle'
import { useState } from 'react'
import { useAuth } from 'shared/context/AuthContext'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const AuthorPostWrapper = styled.div`
  display: flex;

`

const StyledPostPreview = styled.a`
  background-color: #ffd9f3;
  border-radius: 10px;
  padding:5px 20px;
  max-width: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, .2);
  transition: transform 0.2s ease, box-shadow .2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  height: 250px; 
  text-decoration: none;
  color: inherit;

  &:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  
  }

  h3 {
    text-align: left;
    font-size: 1.5rem;
    text-decoration: none;
    color: inherit;
  }

  p {
    font-size: 1rem;
    color: #4b5563;
  }

`

const TogglePublished = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;

`

const StyledButton = styled(Link)`
  width: 100px;
  height: 50px;
  text-decoration: none;
  color: black;  /* Set text color to white for visibility */
  border-radius: 20px;  /* Optional: adds rounded corners */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: 	#e1ddff;
  
  &:hover {
    background-color: 	#f4b5eb;  /* Darken background on hover */
  }
`

const PostOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

export default function AuthorPreview({ post }) {
  const [isPublished, setIsPublished] = useState(post.published || false)
  const { user } = useAuth()

  const handleToggle = async (e) => {
    const newStatus = !isPublished
    setIsPublished(newStatus)

    try {
      const token = localStorage.getItem('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      await axios.put('http://localhost:3000/api/posts/toggle_publish',
        {
          id: post.id,
          published: newStatus
        },
        {headers}
      )
      console.log('Post publish status updated')
    } catch (error) {
      console.error('Error updating published status', error)
      setIsPublished(isPublished)
    }
  }

  const handleDelete = async (e) => {
    try {
      const token = localStorage.getItem('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      await axios.delete(`http://localhost:3000/api/posts/delete/${post.id}`,
        {headers}
      )
      window.location.reload()
    } catch (error) {
      console.log('error deleting', error)
    }
    
    
  }

  return (
    <AuthorPostWrapper>
      <StyledPostPreview href={`/posts/${post.id}`}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </StyledPostPreview>
      <PostOptionsContainer>
        <TogglePublished>
          <Toggle
            id='published'
            checked={isPublished}
            onChange={handleToggle}
          />
          <label htmlFor='published'>Published</label>
        </TogglePublished>
        <StyledButton to={`/edit/${post.id}`} state={{ post }}>Edit</StyledButton>
        <StyledButton onClick={handleDelete}>Delete</StyledButton>
      </PostOptionsContainer>
    </AuthorPostWrapper>
  )
}
