import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./short-components/NavBar";
import Footer from "./Footer";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  background: #f7f7f7;
`;

const CartContainer = styled.div`
  max-width: 900px;
  margin: 20px auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
`;

const CartHeader = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
`;

const SummaryBar = styled.div`
  background: #e6f4ff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1.2rem;
`;

const ProceedButton = styled.button`
  background: #ffb300;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  color: #000;
  &:hover {
    background: #ff9900;
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 4px;
`;

const ItemPrice = styled.span`
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  height: 32px;
`;

const QtyButton = styled.button`
  background: none;
  border: none;
  width: 32px;
  height: 100%;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const QtyDisplay = styled.span`
  width: 40px;
  text-align: center;
  font-size: 0.9rem;
  line-height: 32px;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 6px 10px;
  font-size: 0.85rem;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
  }
`;

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemsWithQty = storedCart.map(item => ({ ...item, qty: item.qty || 1 }));
    setCartItems(itemsWithQty);
  }, []);

  const updateQty = (id, delta) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
  };

  const saveForLater = (item) => {
    // Move item back to wishlist
    const storedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    if (!storedWishlist.find(p => p.id === item.id)) {
      localStorage.setItem("wishlistItems", JSON.stringify([...storedWishlist, item]));
    }
    removeItem(item.id);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2);

  return (
    <PageWrapper>
      <Navbar />
      <MainContent>
        <CartContainer>
          <CartHeader>Your Cart</CartHeader>
          {cartItems.length === 0 ? (
            <p style={{ textAlign: "center" }}>Your cart is empty. Add items to see them here.</p>
          ) : (
            <>
              <SummaryBar>
                <span>Subtotal ${totalPrice}</span>
                <ProceedButton>Proceed to Buy ({cartItems.length} item{cartItems.length > 1 ? "s" : ""})</ProceedButton>
              </SummaryBar>
              <ItemList>
                {cartItems.map(item => (
                  <ItemCard key={item.id}>
                    <ItemInfo>
                      <input type="checkbox" />
                      <ItemImage src={item.image} alt={item.title} />
                      <ItemDetails>
                        <ItemTitle>{item.title}</ItemTitle>
                        <ItemPrice>${item.price}</ItemPrice>
                      </ItemDetails>
                    </ItemInfo>
                    <QuantityControls>
                      <QtyButton onClick={() => updateQty(item.id, -1)}>-</QtyButton>
                      <QtyDisplay>{item.qty}</QtyDisplay>
                      <QtyButton onClick={() => updateQty(item.id, 1)}>+</QtyButton>
                    </QuantityControls>
                    <Actions>
                      <ActionButton onClick={() => removeItem(item.id)}>Delete</ActionButton>
                      <ActionButton onClick={() => saveForLater(item)}>Save for later</ActionButton>
                    </Actions>
                  </ItemCard>
                ))}
              </ItemList>
            </>
          )}
        </CartContainer>
      </MainContent>
      <Footer />
    </PageWrapper>
  );
}

export default Cart;