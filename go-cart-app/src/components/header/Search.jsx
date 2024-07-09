import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Search = ({ handleSearch }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    handleSearch(value);
  };

  return (
    <SearchContainer>
      <SearchIcon />
      <Input
        type="text"
        placeholder="Search for products, brands and more"
        onChange={handleChange}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: relative;
  width: 60%; /* Increased the width slightly */
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px 8px 35px; /* Adjusted padding to accommodate the search icon on the left */
  border: none; /* Removed the default border */
  border-radius: 4px;
  font-size: 14px;
  outline: none; /* Removed the default outline */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Added a subtle box-shadow */
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 10px; /* Positioned the icon to the left side */
  transform: translateY(-50%);
  color: #ccc;
  cursor: pointer;
`;

export default Search;
