import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavContainer>
      <NavItem>
        <StyledLink to="/">Home</StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/about">About</StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/products">Products</StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/blogs">Blog</StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/contact">Contact</StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/wishlist">Wishlist</StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="/cart">Cart</StyledLink>
      </NavItem>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

export default Navbar;