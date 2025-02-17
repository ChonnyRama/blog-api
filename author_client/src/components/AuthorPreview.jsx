import React from 'react'
import styled from 'styled-components'
import "react-toggle/style.css"
import Toggle from 'react-toggle'
import { useState } from 'react'
import { useAuth } from 'shared/context/AuthContext'
import axios from 'axios'

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

export default function AuthorPreview({ post }) {
  const [isPublished, setIsPublished] = useState(post.published || false)
  const { user} = useAuth()

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

  return (
    <AuthorPostWrapper>
      <StyledPostPreview href={`/posts/${post.id}`}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </StyledPostPreview>
      <TogglePublished>
        <Toggle
          id='published'
          checked={isPublished}
          onChange={handleToggle}
        />
        <label htmlFor='published'>Published</label>
      </TogglePublished>
    </AuthorPostWrapper>
  )
}
