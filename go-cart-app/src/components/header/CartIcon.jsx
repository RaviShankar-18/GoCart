import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCartData } from "../../pages/products/Cart/Cart.Slice";
import styled from "styled-components";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";

const CartContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
`;

const IconContainer = styled.div`
  position: relative;
`;

const CartBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartText = styled.span`
  margin-left: 8px;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none; /* Remove underline */
`;

const StyledCartIcon = styled(HiOutlineShoppingCart)`
  font-size: 24px; /* Increased icon size */
`;

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartProducts.data);

  useEffect(() => {
    dispatch(loadCartData());
  }, [dispatch]);

  return (
    <Link to="/cart" style={{ textDecoration: "none" }}>
      <CartContainer>
        <IconContainer>
          <StyledCartIcon />
          {cartData.length > 0 && <CartBadge>{cartData.length}</CartBadge>}
        </IconContainer>
        <CartText>Cart</CartText>
      </CartContainer>
    </Link>
  );
};

export default CartIcon;
