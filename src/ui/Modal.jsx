import { cloneElement, createContext, useContext, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

import useOutsideClick from "../hooks/useOutsideClick";
import Heading from "../ui/Heading";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 6rem 6rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// COMPOUND COMPONENT PATTERN
// 1. Create context
const ModalContext = createContext();

// 2. Create parent
function Modal({ children }) {
  const [openWindow, setOpenWindow] = useState("");

  const close = () => setOpenWindow("");
  const open = setOpenWindow;

  return (
    <ModalContext.Provider value={{ openWindow, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3. Create child
// 3.1. Open >> This will be called by <Modal.Open>
// This is the trigger to open modal
function Open({ children, opens: openWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(openWindowName) });
}

// 3.2. Window >> This will be called by <Modal.Window>
// This is the window that'll be opened
function Window({ children, name, title = "Add Title" }) {
  const { openWindow, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openWindow) return null;

  return (
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <ModalContent>
          <Heading as="h2">{title}</Heading>
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </ModalContent>
      </StyledModal>
    </Overlay>
  );
}

// 4. Add to properties
Modal.Open = Open;
Modal.Window = Window;

// 5. Export default
export default Modal;
