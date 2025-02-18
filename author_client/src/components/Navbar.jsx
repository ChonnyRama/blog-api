import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse, faUser,faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from 'shared/context/AuthContext';

//https://www.color-hex.com/color-palette/1055574
const StyledNavbar = styled.div`
  display: flex;
  width: 99vw;
  justify-content: space-between;  
  position: fixed;
  top: 0;
  left:0;
  z-index:100;
  padding: 2rem;
  background-color: #d0c9ff;
  max-height: 30px;
`;

const StyledLink = styled(Link)`
  color:black;
  position: relative;
  padding:5px;
`

const UserDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;

  .button-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  span {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    bottom: -20px;
    background-color: #e1ddff;
    color: black;
    padding: 2px 6px;
    font-size: .9rem;
    border-radius: 5px;
  }

  .button-wrapper:hover span {
    visibility: visible;
    opacity: 1;
  }

  button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;  
    }

`





export const Navbar = () => {
  const {user, isAuthenticated, logout} = useAuth()

  const handleLogout = () => {
    logout()
  }
  return (
    <StyledNavbar >
      <StyledLink to='/'> <FontAwesomeIcon icon={faHouse} /></StyledLink>
      {isAuthenticated ? (
        <UserDiv>
          <p>Welcome! {user.username}</p>
          <div className='button-wrapper'>
            <button onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
            <span>Logout</span>
          </div>
        </UserDiv>
      ) : (
        <StyledLink to='/login'> Login   <FontAwesomeIcon icon={faUser} /></StyledLink>
      )}
    </StyledNavbar>
  )
}

