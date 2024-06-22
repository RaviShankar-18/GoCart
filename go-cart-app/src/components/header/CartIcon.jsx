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
`;

const CartBadge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 12px;
`;

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartProducts.data); // Correctly access the state

  useEffect(() => {
    // Dispatch the loadCartData action when the component mounts
    dispatch(loadCartData());
  }, [dispatch]);

  return (
    <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
      <CartContainer>
        <HiOutlineShoppingCart size={24} />
        <span> Cart</span>
        {cartData.length > 0 && <CartBadge>{cartData.length}</CartBadge>}
      </CartContainer>
    </Link>
  );
};

export default CartIcon;
