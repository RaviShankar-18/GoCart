import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  text-transform: uppercase;
`;

const Text = styled.p`
  margin-top: 10px;
`;

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const referenceNum = searchParams.get("reference");

  return (
    <Box>
      <VStack>
        <Heading>Order Successful</Heading>
        {referenceNum ? (
          <Text>Reference No. {referenceNum}</Text>
        ) : (
          <Text>
            No reference number found. Please check your order details.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default PaymentSuccess;
