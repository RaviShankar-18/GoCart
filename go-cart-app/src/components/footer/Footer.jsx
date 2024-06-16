import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; Crafted with ❤️ by Ravi Shankar</FooterText>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 16px;
`;
