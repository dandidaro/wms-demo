import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 4rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logoipsum.svg" alt="logo" />
    </StyledLogo>
  );
}

export default Logo;
