import React from 'react'
import styled from 'styled-components'

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

export default function PostPreview({post}) {
  return (
    <StyledPostPreview href={`/posts/${post.id}`}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </StyledPostPreview>
  )
}
