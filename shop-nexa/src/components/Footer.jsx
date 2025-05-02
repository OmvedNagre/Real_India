import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #f9f9f9;
  border-top: 1px solid #e0e0e0;
  color: #444;
  font-size: 14px;
  position:fixed;
  bottom:0;
  right:0;
  left:0; 
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 30px;
`;

const Column = styled.div``;

const Heading = styled.h3`
  font-weight: bold;
  margin-bottom: 10px;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 6px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  font-size: 12px;
  background-color: #f1f1f1;
  border-top: 1px solid #ddd;
  padding: 15px 10px;
  color: #555;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Column>
          <Heading>About Us</Heading>
          <LinkList>
            <LinkItem>Join Sales</LinkItem>
            <LinkItem>Success Stories</LinkItem>
            <LinkItem>Shipping & Delivery Policy</LinkItem>
            <LinkItem>Returns & Cancellation Policy</LinkItem>
            <LinkItem>Press Section</LinkItem>
            <LinkItem>Advertise with Us</LinkItem>
            <LinkItem>Investor Section</LinkItem>
          </LinkList>
        </Column>
        <Column>
          <Heading>Help</Heading>
          <LinkList>
            <LinkItem>Feedback</LinkItem>
            <LinkItem>Complaints</LinkItem>
            <LinkItem>Customer Care</LinkItem>
            <LinkItem>Jobs & Careers</LinkItem>
            <LinkItem>Contact Us</LinkItem>
          </LinkList>
        </Column>
        <Column>
          <Heading>Suppliers Tool Kit</Heading>
          <LinkList>
            <LinkItem>Sell on IndiaMART</LinkItem>
            <LinkItem>Latest BuyLead</LinkItem>
            <LinkItem>Learning Centre</LinkItem>
            <LinkItem>Ship With IndiaMART</LinkItem>
          </LinkList>
        </Column>
        <Column>
          <Heading>Buyers Tool Kit</Heading>
          <LinkList>
            <LinkItem>Post Your Requirement</LinkItem>
            <LinkItem>Products You Buy</LinkItem>
            <LinkItem>Search Products & Suppliers</LinkItem>
          </LinkList>
        </Column>
        <Column>
          <Heading>Accounting Solutions</Heading>
          <LinkList>
            <LinkItem>Accounting Software</LinkItem>
            <LinkItem>Tally on Mobile</LinkItem>
            <LinkItem>GST e-Invoice</LinkItem>
          </LinkList>
        </Column>
      </FooterContent>
      <FooterBottom>
        <p>Copyright © 1996-2025 IndiaMART InterMESH Ltd. All rights reserved.</p>
        <p>
          <a href="#">Terms of Use</a> · <a href="#">Privacy Policy</a> · <a href="#">Link to Us</a>
        </p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
