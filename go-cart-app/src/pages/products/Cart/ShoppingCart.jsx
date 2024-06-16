import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { removeFromCart } from "./Cart.Slice";

const CartLayout = () => {
  const dispatch = useDispatch();
  const [itemCounts, setItemCounts] = useState({});
  const cartProducts = useSelector((state) => state.cartProducts.data);

  const onClickDelete = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const onClickIncrement = (productId) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
  };

  const onClickDecrement = (productId) => {
    if (itemCounts[productId] > 1) {
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [productId]: prevCounts[productId] - 1,
      }));
    }
  };

  useEffect(() => {
    // Load cart data if needed
  }, []);

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartProducts.forEach((product) => {
      const discountedPrice =
        product.price * (1 - product.discountPercentage / 100);
      const quantity = itemCounts[product.id] || 1; // Default quantity is 1
      totalPrice += discountedPrice * quantity;
    });
    return totalPrice;
  };

  return (
    <Container>
      <CartItemsContainer>
        <Title>Your Cart</Title>
        {cartProducts.map((product) => (
          <CartItem key={product.id}>
            <ProductImage src={product.thumbnail} alt={product.title} />
            <ProductInfo>
              <ProductName>
                <Link to={`/${product.id}`}>{product.title}</Link>
              </ProductName>
              <ProductPrice>${product.price}</ProductPrice>
              <QuantityContainer>
                <QuantityButton onClick={() => onClickDecrement(product.id)}>
                  -
                </QuantityButton>
                <Quantity>{itemCounts[product.id] || 1}</Quantity>
                <QuantityButton onClick={() => onClickIncrement(product.id)}>
                  +
                </QuantityButton>
              </QuantityContainer>
              <DeleteButton onClick={() => onClickDelete(product.id)}>
                Remove
              </DeleteButton>
            </ProductInfo>
          </CartItem>
        ))}
      </CartItemsContainer>
      <PriceDetailsContainer>
        <PriceDetailsTitle>Price Details</PriceDetailsTitle>
        <PriceDetails>
          {cartProducts.map(({ id, price, discountPercentage }) => (
            <PriceDetailItem key={id}>
              <div>Item Price: ${price}</div>
              <div>Discount Percentage: {discountPercentage}%</div>
            </PriceDetailItem>
          ))}
          <TotalPrice>Total Price: ${getTotalPrice().toFixed(2)}</TotalPrice>
        </PriceDetails>
      </PriceDetailsContainer>
    </Container>
  );
};

export default CartLayout;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: auto;
`;

const CartItemsContainer = styled.div`
  flex-grow: 1;
  margin-right: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding: 12px 0;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const ProductPrice = styled.p`
  font-size: 14px;
  color: #007bff;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #007bff;
  font-size: 18px;
  margin: 0 5px;
`;

const Quantity = styled.span`
  font-size: 16px;
`;

const DeleteButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 6px 12px;
  color: #007bff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const PriceDetailsContainer = styled.div`
  flex-basis: 30%;
`;

const PriceDetailsTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const PriceDetails = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const PriceDetailItem = styled.div`
  margin-bottom: 10px;
`;

const TotalPrice = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
`;
