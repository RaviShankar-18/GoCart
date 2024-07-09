import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EmptyCartImageAVIF from "../../../assets/empty-cart-background.avif";
import { loadCartData, removeFromCart } from "./Cart.Slice";

const CartLayout = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState({});
  const cartProducts = useSelector((state) => state.cartProducts.data);
  const totalPrice = cartProducts.reduce(
    (accumulator, { id, price, discountPercentage }) => {
      const discountedPrice = price * (1 - discountPercentage / 100);
      const countOfProducts = cartItems[id] || 1;
      return accumulator + countOfProducts * discountedPrice;
    },
    0
  );

  const checkoutHandler = async (amount) => {
    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:4000/api/getkey");

      const {
        data: { order },
      } = await axios.post("http://localhost:4000/api/checkout", { amount });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Ravi Shankar Kumar",
        description: "RazorPay payment integration",
        image: "https://avatars.githubusercontent.com/u/121035835?v=4",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/paymentverification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };

      // Ensure Razorpay is available
      if (window.Razorpay) {
        const razor = new window.Razorpay(options);
        razor.open();
      } else {
        console.error("Razorpay SDK not loaded");
      }
    } catch (error) {
      console.error("Error in checkoutHandler:", error);
    }
  };

  const onClickDelete = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const onClickIncrement = (id) => {
    setCartItems((prevState) => ({
      ...prevState,
      [id]: (prevState[id] || 1) + 1,
    }));
  };

  const onClickDecrement = (id) => {
    if (cartItems[id] > 1) {
      setCartItems((prevState) => ({
        ...prevState,
        [id]: prevState[id] - 1,
      }));
    }
  };

  useEffect(() => {
    dispatch(loadCartData());
  }, [dispatch]);

  return (
    <>
      <Container>
        {cartProducts.length === 0 ? (
          <EmptyCart>
            <EmptyCartImage src={EmptyCartImageAVIF} alt="Empty Cart" />
            <EmptyCartMessage>Your cart is empty!</EmptyCartMessage>
            <EmptyCartSubMessage>Add items to it now.</EmptyCartSubMessage>
            <ShopNowButton to="/">Shop now</ShopNowButton>
          </EmptyCart>
        ) : (
          <CartContent>
            <ProductList>
              {cartProducts.map((product) => (
                <CartItem key={product.id}>
                  <ProductImage src={product.thumbnail} alt={product.title} />
                  <ProductInfo>
                    <ProductName>
                      <Link to={`/view-product/${product.id}`}>
                        {product.title}
                      </Link>
                    </ProductName>
                    <ProductPrice>${product.price}</ProductPrice>
                    <IncrementButton>
                      <button onClick={() => onClickDecrement(product.id)}>
                        -
                      </button>
                      {cartItems[product.id] || 1}
                      <button onClick={() => onClickIncrement(product.id)}>
                        +
                      </button>
                    </IncrementButton>
                    <DeleteButton onClick={() => onClickDelete(product.id)}>
                      Remove
                    </DeleteButton>
                  </ProductInfo>
                </CartItem>
              ))}
            </ProductList>
            <CartSummary>
              <SummaryTitle>Order Summary</SummaryTitle>
              {cartProducts.map(({ id, price, discountPercentage }) => (
                <PriceItem key={id}>
                  <div>Item Price: ${price}</div>
                  <div>Discount: {discountPercentage}%</div>
                </PriceItem>
              ))}
              <TotalPrice>Total Amount ${totalPrice.toFixed(2)}</TotalPrice>
              <PlaceOrderButton
                onClick={() => checkoutHandler(Math.round(totalPrice))}
              >
                Place Order
              </PlaceOrderButton>
            </CartSummary>
          </CartContent>
        )}
      </Container>
    </>
  );
};

export default CartLayout;

const Container = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

const EmptyCart = styled.div`
  text-align: center;
`;

const EmptyCartImage = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const EmptyCartMessage = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const EmptyCartSubMessage = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ShopNowButton = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  color: #fff;
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const CartContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const ProductList = styled.div`
  flex: 1;
  margin-right: 20px;
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
  border: 1px solid #e0e0e0;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  a {
    text-decoration: none;
    color: #333;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: #007bff;
  margin-bottom: 8px;
`;

const DeleteButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 6px 12px;
  color: #ff7d1a;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const IncrementButton = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  button {
    margin: 0 5px;
    border: 1px solid #007bff;
    background-color: transparent;
    color: #007bff;
    cursor: pointer;
    padding: 3px 8px;
    font-size: 14px;
  }

  button:hover {
    background-color: #007bff;
    color: #ffffff;
  }
`;

const CartSummary = styled.div`
  flex-basis: 300px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
`;

const SummaryTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
`;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 16px;
`;

const TotalPrice = styled.h4`
  font-size: 20px;
  margin-top: 20px;
`;

const PlaceOrderButton = styled.button`
  background-color: #007bff;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
