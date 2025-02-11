import React from 'react'
import styled from 'styled-components'
import { Link} from 'react-router-dom'

const IntroDiv = styled.div`
  margin-top: 70px;
  display: flex;
  gap: 10px;
`

const IntroFirst = styled.div`
  flex:1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #D3D3D3;
  padding: 20px;
  border-radius: 10px;
`

const IntroSecond = styled.div`
  flex:1
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
  height: auto;
  object-fit: cover;
  border-radius: 10px;

`

export default function HomePage() {
  return (
    <div>
      <IntroDiv>
        <IntroFirst>
          <h2>Welcome to Chonmagora</h2>
          <p>Hello and welcome! My name is Chonny and this is my blog written by an aspiring developer. Feel free to look through my posts and enjoy your time here. </p>
          <IntroButtons>
            <ButtonLink to='/register'>Sign up</ButtonLink> 
          </IntroButtons>
        </IntroFirst>
        <IntroSecond>
          <StyledImage src="/keyboard.jpg" alt="desk"></StyledImage>
        </IntroSecond>

      </IntroDiv>
    </div>
  )
}
