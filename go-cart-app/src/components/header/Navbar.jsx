import { Link } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";
import CartIcon from "./CartIcon";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #2874f0;
  color: #ffffff;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #ffe500;
`;

// const CartIcon = styled(Link)`
//   font-size: 24px;
//   background-color: transparent;
//   border: none;
//   color: #ffffff;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   text-decoration: none;
// `;

const HeaderInnerContainer = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Navbar = ({ handleSearch }) => {
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <Logo to="/">GoCart</Logo>
        <Search handleSearch={handleSearch} />
        {/* <CartIcon to="/cart">
          <HiOutlineShoppingCart />
          <span> Cart</span>
        </CartIcon> */}
        <CartIcon />
      </HeaderInnerContainer>
    </HeaderContainer>
  );
};

export default Navbar;
