import React from 'react'
import styled from 'styled-components';

export default function Navbar() {
  return (
    <Nav>
      <LeftSection>
        <div>ShopNexa</div>
        <div>Home</div>
        <div>Blog</div>
        <div>About Us</div>
        <div>Contact Us</div>
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
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  width:100vw;
  position:fixed;
  top:0;
  left:0;
  right:0;

`;

const LeftSection = styled.div`
  display: flex;
  gap: 1.5rem;
  font-weight: bold;
  color: black;
`;

const RightSection = styled.div`
  display: flex;
  gap: 1.5rem;
  color: black;
`;
