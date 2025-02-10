import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledNavbar = styled.div`
  display: flex;
  width: 95vw;
  justify-content: space-between;  
  position: fixed;
  top: 0;
  left:0;
  z-index:100;
  padding: 2rem;
  background-color: #43dfdb;
`;

const StyledLink = styled(Link)`
  color:black;
  position: relative;
`





export const Navbar = () => {

  return (
    <StyledNavbar >
      <StyledLink to='/'>Home</StyledLink>
    </StyledNavbar>
  )
}

