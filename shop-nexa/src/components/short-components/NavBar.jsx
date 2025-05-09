import React from 'react'
import styled from 'styled-components';

export default function Navbar() {
  return (
    <Nav>
      <div>ShopNexa</div>
      <LeftSection>
        
        <div>Home</div>
        <div>About</div>
        <div>Products</div>
        <div>Blog</div>
        <div>Contact</div>
      </LeftSection>
      <RightSection>
        <div>WishList</div>
        <div>Cart</div>
      </RightSection>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  background-color: white;
  border-bottom: 1px solid #ddd;
  width:97vw;
`;

const LeftSection = styled.div`
  display: flex;
  gap: 1.5rem;
  font-weight: bold;
  color: black;
  bg color: white;
  padding: 1rem;
  border-radius: 8px;
  div:hover {
    cursor: pointer;
    color: blue;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 1rem;
  color: black;
`;
