import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse, faUser} from '@fortawesome/free-solid-svg-icons'

//https://www.color-hex.com/color-palette/1055574
const StyledNavbar = styled.div`
  display: flex;
  width: 95vw;
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





export const Navbar = () => {

  return (
    <StyledNavbar >
      <StyledLink to='/'> <FontAwesomeIcon icon={faHouse} /></StyledLink>
      <StyledLink to='/login'> <FontAwesomeIcon icon={faUser} /></StyledLink>
    </StyledNavbar>
  )
}

