import React from 'react'
import useFetchData from '../hooks/use-fetch-data'
import styled from 'styled-components'
import AuthorPreview from '../components/AuthorPreview'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faUser,faRightFromBracket} from '@fortawesome/free-solid-svg-icons'

const AuthorDashContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`

const ErrorMessage = styled.div`
  margin-top: 100px;
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
  background-color: #fdd;
  border: 1px solid #f99;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const CreateButton = styled(Link)`
  padding: 20px;
  text-decoration: none;
  color: black;  /* Set text color to white for visibility */
  border-radius: 5px;  /* Optional: adds rounded corners */
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    background-color: 	#e1ddff;  /* Darken background on hover */
  }
`

export default function AuthorDashboard() {
  const {data, loading, error} = useFetchData('http://localhost:3000/api/posts/all')
  
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>
  }

  return (
    <AuthorDashContainer>
      <CreateButton to='/create'>
        <FontAwesomeIcon icon={faPlus} />
        Create new post
      </CreateButton>
      {loading && <div>Loading...</div>}
      {!loading && (
        data.map((post) => (
          <AuthorPreview key={post.id} post={post}></AuthorPreview>
        ))
      )}
    </AuthorDashContainer>
  )
}
