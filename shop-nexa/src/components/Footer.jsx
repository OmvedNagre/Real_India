import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #f9f9f9;
  border-top: 1px solid #e0e0e0;
  color: #444;
  font-size: 14px;

`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5px 20px;
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
          <Heading>Quick Links</Heading>
          <LinkList>
            <LinkItem>Join Sales</LinkItem>
            <LinkItem>Shipping & Delivery Policy</LinkItem>
            <LinkItem>Returns & Cancellation Policy</LinkItem>
            <LinkItem>Advertise with Us</LinkItem>
          </LinkList>
        </Column>
        <Column>
          <Heading>Help</Heading>
          <LinkList>
            <LinkItem>Feedback</LinkItem>
            <LinkItem>Complaints</LinkItem>
            <LinkItem>Customer Care</LinkItem>
            <LinkItem>Jobs & Careers</LinkItem>
          </LinkList>
        </Column>
        <Column>
          <Heading>Follow Us</Heading>
          <LinkList>
            <LinkItem>Facebook</LinkItem>
            <LinkItem>Twitter</LinkItem>
            <LinkItem>Instagram</LinkItem>
            <LinkItem>LinkedIn</LinkItem>
          </LinkList>
        </Column>
        <Column>
          <Heading>About Us</Heading>
          <LinkList>
            <LinkItem>Our Story</LinkItem>
            <LinkItem>Privacy Policy</LinkItem>
            <LinkItem>Terms of Service</LinkItem>
          </LinkList>
        </Column>
      </FooterContent>

      <FooterBottom>
        <p>Copyright © 2025 ShopNexa Ltd. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
