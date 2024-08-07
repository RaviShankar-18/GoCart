import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProductDetails } from "./ProductDetails.Slice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { addToCart } from "../Cart/Cart.Slice";
import Navbar from "../../../components/header/Navbar";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  console.log("Product Id", productId);
  const { isLoading, data, error } = useSelector(
    (state) => state.productDetails
  );

  const cartProducts = useSelector((state) => state.cartProducts.data);

  const isInCart =
    data && cartProducts.some((products) => products.id === data.id);

  useEffect(() => {
    dispatch(getProductDetails({ productId }));
  }, [productId, dispatch]);

  const onClickAddToCart = () => {
    if (data) {
      dispatch(addToCart(data));
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <ImageWrapper>
          <MainImage src={data?.thumbnail} alt={data?.title} />
        </ImageWrapper>
        <DetailsWrapper>
          <Title>{data?.title}</Title>
          <Description>{data?.description}</Description>
          <PriceWrapper>
            <CurrentPrice>${data?.price}</CurrentPrice>
          </PriceWrapper>
          <Stock>In Stock: {data?.stock} units</Stock>
          {isInCart ? (
            <StyledLink to="/cart">
              <ActionButton>
                <FaShoppingCart />
                Go To Cart
              </ActionButton>
            </StyledLink>
          ) : (
            <StyledLink to="/cart">
              <ActionButton onClick={onClickAddToCart}>
                <FaShoppingCart />
                Add To Cart
              </ActionButton>
            </StyledLink>
          )}
        </DetailsWrapper>
      </Container>
    </>
  );
};

export default ProductDetails;

const Container = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 40px;
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainImage = styled.img`
  width: 90%;
  height: auto;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const DetailsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  margin-bottom: 20px;
  color: #555;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CurrentPrice = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
`;

const Stock = styled.p`
  font-size: 16px;
  color: #888;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ActionButton = styled.button`
  background-color: #ff7d1a;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 48px;
  width: 180px;
  font-size: 18px;
`;
