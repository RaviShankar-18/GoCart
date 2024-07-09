import { Link } from "react-router-dom";
import styled from "styled-components";
import Search from "./Search";
import CartIcon from "./CartIcon";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #2874f0;
  color: #ffffff;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #ffe500;
  margin-right: 20px; /* Adjust the spacing between the logo and the search box */
`;

const HeaderInnerContainer = styled.div`
  width: 100%;
  max-width: 1200px; /* Adjust the max-width as needed */
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Navbar = ({ handleSearch }) => {
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <LeftContainer>
          <Logo to="/">GoCart</Logo>
          <Search handleSearch={handleSearch} />
        </LeftContainer>
        <RightContainer>
          <CartIcon />
        </RightContainer>
      </HeaderInnerContainer>
    </HeaderContainer>
  );
};

export default Navbar;
