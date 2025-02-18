import {format} from 'date-fns'
import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;  // Center the container within its parent
  align-items: start;
  justify-content: center;
  text-align: left;
`

export default function SinglePost() {
  const location = useLocation()
  const post = location.state?.post
  const formattedDate = format(new Date(post.createdAt), 'MMM dd yyyy')





  return (
    <PostContainer>
      <h2>{post.title}</h2>
      <span>Chonma | {formattedDate}</span>
      <p>{post.content}</p>
    </PostContainer>
  )
}
