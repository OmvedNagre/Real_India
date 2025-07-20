import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './short-components/Navbar';

const Container = styled.div`
  max-width: 800px;
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
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
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

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ItemName = styled.span`
  font-weight: 600;
  color: #333;
`;

const ItemPrice = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const ItemQuantity = styled.span`
  font-size: 0.9rem;
  color: #666;
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

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <PageWrapper>
      <Navbar />
      <MainContent>
        <Container>
          <Title>Your Cart</Title>
          {cartItems.length === 0 ? (
            <>
              <p>Your cart is empty</p>
              <p>Add items to your cart to see them here.</p>
              <Button>Continue Shopping</Button>
            </>
          ) : (
            <>
              {cartItems.map(item => (
                <CartItem key={item.id}>
                  <ItemDetails>
                    <ItemName>{item.title}</ItemName>
                    <ItemPrice>Price: ${item.price}</ItemPrice>
                  </ItemDetails>
                  <Button onClick={() => removeItem(item.id)}>Remove</Button>
                </CartItem>
              ))}
              <h3 style={{ marginTop: '20px' }}>Total: ${totalPrice}</h3>
              <Button style={{ marginTop: '20px', backgroundColor: '#28a745' }}>
                Checkout / Buy Now
              </Button>
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