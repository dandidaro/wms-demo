import styled, { keyframes } from "styled-components";

const rotation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;
const Spinner = styled.div`
  margin: 4.8rem auto;

  width: 4rem;
  aspect-ratio: 1;
  border: 3px solid var(--color-brand-800);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;

  &:after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5.5rem;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 3px solid;
    border-color: var(--color-brand-500) transparent;
  }
`;

export default Spinner;
