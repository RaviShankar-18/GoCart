// import { useMemo, useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import styled from "styled-components";
// import { getProductList } from "../../pages/products/ProductListing/ProductList.Slice";

// const Search = () => {
//   const productListData = useSelector((state) => state.productListing.data);
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleOnChange = (event) => {
//     const { value } = event.target;
//     setSearchQuery(value);
//   };

//   const clearSearch = () => {
//     setSearchQuery("");
//   };

//   const isMatchWithSearch = useMemo(() => {
//     if (searchQuery.trim() === "") {
//       return productListData;
//     }
//     return (
//       productListData &&
//       productListData.filter((product) =>
//         product.title.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [productListData, searchQuery]);

//   useEffect(() => {
//     dispatch(getProductList());
//   }, [dispatch]);

//   return (
//     <>
//       <SearchContainer>
//         <SearchBox
//           type="search"
//           name="searching"
//           value={searchQuery}
//           placeholder="Search for products, brands and more"
//           onChange={handleOnChange}
//         />
//         <ClearButton onClick={clearSearch}>Clear</ClearButton>
//       </SearchContainer>
//       <SearchResults>
//         {isMatchWithSearch ? (
//           isMatchWithSearch.map((product) => (
//             <ProductItem key={product.id}>
//               <img src={product.thumbnail} alt={product.title} />
//               <div>
//                 <ProductName>{product.title}</ProductName>
//                 <ProductPrice>${product.price}</ProductPrice>
//               </div>
//             </ProductItem>
//           ))
//         ) : (
//           <NoResultsText>Products not found!</NoResultsText>
//         )}
//       </SearchResults>
//     </>
//   );
// };

// export default Search;

// const SearchContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 16px;
// `;

// const SearchBox = styled.input`
//   width: 70%;
//   padding: 8px 12px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
// `;

// const ClearButton = styled.button`
//   margin-left: 10px;
//   padding: 8px 12px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
// `;

// const SearchResults = styled.div`
//   margin-top: 16px;
// `;

// const ProductItem = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 12px;
// `;

// const ProductName = styled.div`
//   font-size: 18px;
//   font-weight: bold;
// `;

// const ProductPrice = styled.div`
//   font-size: 16px;
//   color: #007bff;
// `;

// const NoResultsText = styled.div`
//   color: red;
// `;
// Search.js

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
      <Input
        type="text"
        placeholder="Search for products, brands and more"
        onChange={handleChange}
      />
      <SearchIcon />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: relative;
  width: 50%;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px 30px 5px 10px; /* Adjust padding to accommodate the search icon */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #ccc;
  cursor: pointer;
`;

export default Search;
