import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import Navbar from "../../../components/header/Navbar";
import { getProductList } from "./ProductList.Slice";
import Footer from "../../../components/footer/Footer";

const ProductListing = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  let debounceTimer;
  const [brand, setBrand] = useState([
    { name: "Apple", checked: false },
    { name: "Samsung", checked: false },
    { name: "OPPO", checked: false },
    { name: "HP Pavilion", checked: false },
    { name: "Microsoft Surface", checked: false },
  ]);
  const [rating, setRating] = useState([
    { name: "4.5★ & above", checked: false },
    { name: "4★ & above", checked: false },
  ]);

  const [discount, setDiscount] = useState([
    { name: "15% or more", checked: false },
    { name: "10% or more", checked: false },
    { name: "5% or more", checked: false },
  ]);

  const { isLoading, data } = useSelector((state) => state.productListing);

  const fetchSearchResults = (searchQuery) => {
    console.log("Searching for:", searchQuery);
  };

  const debounce = (func, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      func(searchQuery);
    }, delay);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    debounce(fetchSearchResults, 300);
  };

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  const filteredProducts =
    data &&
    data
      .filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((product) => {
        const checkedBrands = brand.filter((b) => b.checked).map((b) => b.name);
        return (
          checkedBrands.length === 0 || checkedBrands.includes(product.brand)
        );
      })
      .filter((product) => {
        const selectedRatings = rating
          .filter((r) => r.checked)
          .map((r) => r.name);
        if (selectedRatings.length === 0) return true;
        return selectedRatings.some((selectedRating) => {
          const ratingValue = parseFloat(selectedRating.split(" ")[0]);
          return product.rating >= ratingValue;
        });
      })
      .filter((product) => {
        const discountedItems = discount.filter((d) => d.checked);
        if (discountedItems.length === 0) return true;

        return discountedItems.some((discountedItem) => {
          const discountValue = parseFloat(discountedItem.name.split("%")[0]);
          return product.discountPercentage >= discountValue;
        });
      });

  const isFilteredProductsNotNull =
    filteredProducts !== null && filteredProducts !== undefined;

  if (
    isFilteredProductsNotNull &&
    filteredProducts.length === 0 &&
    rating.every((r) => !r.checked)
  ) {
    filteredProducts.push(...data);
  }

  const onChangeCheckbox = (event, brandName) => {
    const isChecked = event.target.checked;
    setBrand((brands) => {
      return brands.map((brand) => {
        const updatedBrand =
          brand.name === brandName ? { ...brand, checked: isChecked } : brand;
        return updatedBrand;
      });
    });
  };

  const onChangeCheckBoxRating = (event, name) => {
    const isChecked = event.target.checked;
    setRating((ratings) => {
      return ratings.map((rating) => {
        return rating.name === name
          ? { ...rating, checked: isChecked }
          : rating;
      });
    });
  };

  const onChangeCheckboxDiscount = (event, name) => {
    const isChecked = event.target.checked;
    setDiscount((discounts) =>
      discounts.map((discount) => {
        return discount.name === name
          ? { ...discount, checked: isChecked }
          : discount;
      })
    );
  };

  return (
    <>
      <Navbar handleSearch={handleSearch} />

      <ProductContainer>
        <FilterContainer>
          <h2>Filters</h2>
          <h2>BRAND</h2>
          {brand.map((brand, index) => {
            return (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={brand.checked}
                    onChange={(event) => onChangeCheckbox(event, brand.name)}
                  />
                  {brand.name}
                </label>
              </div>
            );
          })}

          <h2>CUSTOMER RATINGS</h2>
          {rating.map((rating, index) => {
            return (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={rating.checked}
                    onChange={(event) =>
                      onChangeCheckBoxRating(event, rating.name)
                    }
                  />
                  {rating.name}
                </label>
              </div>
            );
          })}

          <h2>DISCOUNT</h2>
          {discount.map((discount, index) => {
            return (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={discount.checked}
                    onChange={(event) =>
                      onChangeCheckboxDiscount(event, discount.name)
                    }
                  />
                  {discount.name}
                </label>
              </div>
            );
          })}
        </FilterContainer>

        <ProductList>
          {isLoading ? (
            <LoaderContainer>
              <ClipLoader
                loading={isLoading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </LoaderContainer>
          ) : (
            <>
              {data &&
                filteredProducts.map((product) => (
                  <ProductCard key={product.id}>
                    <Link to={`/view-product/${product.id}`}>
                      <ProductImageWrapper>
                        <ProductImage
                          src={product.thumbnail}
                          alt={product.title}
                        />
                      </ProductImageWrapper>
                      <ProductInfo>
                        <ProductTitle>
                          {product.brand} {product.title}
                          <ProductPrice>${product.price}</ProductPrice>
                        </ProductTitle>
                        <ProductRating>
                          {product.rating}
                          <span>★</span>
                        </ProductRating>
                      </ProductInfo>
                    </Link>
                  </ProductCard>
                ))}
            </>
          )}
        </ProductList>
      </ProductContainer>

      <Footer></Footer>
    </>
  );
};

export default ProductListing;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const ProductContainer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
`;

const FilterContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: whitesmoke;
  padding: 20px;
  position: relative;
  flex-shrink: 0;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  flex-grow: 1;
`;

const ProductCard = styled.div`
  width: 300px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const ProductImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProductRating = styled.div`
  font-size: 14px;
  color: #ffffff;
  background-color: #4caf50;
  padding: 3px 6px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 8px;

  span {
    margin-left: 5px;
  }
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;
