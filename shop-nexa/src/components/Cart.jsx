import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './short-components/NavBar';

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
  color: black;
`;

const Paragraph = styled.p`
  margin-top: ${props => props.marginTop || '10px'};
  color: #dark gray;
  font-size: 1rem;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
`;


const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 15px 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ItemName = styled.span`
  font-weight: 500;
  color: very dark gray;
`;

const ItemQuantity = styled.span`
  color: dark gray;
  font-size: 0.9rem;
`;

const Link = styled.a`
  &:hover {
    color: #0056b3;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function Cart({props}) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'T-shirt', quantity: 1 },
    { id: 2, name: 'Shoes', quantity: 1 },
  ]);

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <PageWrapper>
      <Navbar />
      <MainContent>
        <Container>
          <Title>Cart</Title>
          {cartItems.length === 0 ? (
            <>
              <p>Your cart is empty</p>
              <p>Add items to your cart to see them here.</p>
              <p>Continue shopping...</p>
              <Button>Continue Shopping</Button>
            </>
          ) : (
            <>
              {cartItems.map(item => (
                <CartItem key={item.id}>
                  <div>
                    <ItemName>{item.name}</ItemName>
                    <ItemQuantity> — Qty: {item.quantity}</ItemQuantity>
                  </div>
                  <Button onClick={() => removeItem(item.id)}>Remove</Button>
                </CartItem>
              ))}
              <Button>Checkout</Button>
            </>
          )}
          <Paragraph>
            Need help? <Link href="">Contact Support</Link> or visit our <Link href="">FAQ</Link> page.
          </Paragraph>
        </Container>
      </MainContent>
      <Footer />
    </PageWrapper>
  );
}

export default Cart;