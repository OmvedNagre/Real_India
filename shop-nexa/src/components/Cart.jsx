import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const Paragraph = styled.p`
  margin-top: ${props => props.marginTop || '10px'};
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
`;

const Image = styled.img`
  margin: 20px auto;
  display: block;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  transition: background-color 0.3s ease;
`;


const Link = styled.a`
  text-decoration: underline;
  color: #007bff;

  &:hover {
    color: #0056b3;
  }
`;

function Cart() {
  return (
    <Container>
      <Title>Cart</Title>
      <Paragraph>Your cart is empty</Paragraph>
      <Paragraph>Add items to your cart to see them here.</Paragraph>
      <Paragraph>Continue shopping...</Paragraph>
      <button>Continue Shopping</button>
      <Paragraph marginTop="20px">Need help? Contact our support team.</Paragraph>
      <button>Contact Support</button>
      <Paragraph marginTop="20px">
        Or visit our FAQ page for more information.
      </Paragraph>
    </Container>
  );
}

export default Cart;