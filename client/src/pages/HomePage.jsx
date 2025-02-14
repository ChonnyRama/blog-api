import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import useFetchData from '../hooks/use-fetch-data'
import PostPreview from '../components/PostPreview'
import { useAuth } from '../context/AuthContext'

const IntroDiv = styled.div`
  margin: 70px 0;
  display: flex;
  gap: 10px;
  width:100%;
  height: 400px;
`

const IntroFirst = styled.div`
  flex:1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: #e1ddff;
  padding: 10px;
  border-radius: 10px;
`

const IntroSecond = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
const IntroButtons = styled.div`
  text-align: center;
`

const ButtonLink = styled(Link)`
  display: inline-block;
  position: relative;
  padding: 10px 20px;
  background-color: #43dfdb;
  color: black;
  text-decoration: none;
  border-radius:10px;
  transition: background 0.3s;

  &:hover {
  background-color: #3730a3
  }

`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;

`

const StyledThumb = styled.img`
  max-width: 200px;
  align-self: center;

`

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
  grid-gap:10px;
  padding:10px;
`


export default function HomePage() {
  const { data, loading } = useFetchData('http://localhost:3000/api/posts/all')
  const { user, isAuthenticated } = useAuth()
  return (
    <div>
      <IntroDiv>
        <IntroFirst>
          <h2>Welcome { user ? user.username : 'to my blog' }</h2>
          <p>Hello and welcome! My name is Chonny and this is my blog written by an aspiring full-stack developer. Feel free to look through my posts and enjoy your time here. </p>
          {!isAuthenticated ? (
            <IntroButtons>
              <ButtonLink to='/register'>Sign up</ButtonLink> 
            </IntroButtons>
          ) : (
              <StyledThumb src='/094.png'></StyledThumb>
          )}
        </IntroFirst>
        <IntroSecond>
          <StyledImage src="/keyboard.jpg" alt="desk"></StyledImage>
        </IntroSecond>

      </IntroDiv>
      <ContentContainer>
        {loading && <div>Loading</div>}
        {!loading && (
          data.map(post => (
            <PostPreview key={post.id}  post={post}/>
          ))
        )}
      </ContentContainer>
    </div>
  )
}
