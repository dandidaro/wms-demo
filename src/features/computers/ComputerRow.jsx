import styled, { css } from "styled-components";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import { useDeleteComputer } from "./useDeleteComputer";
import CreateComputerForm from "./CreateComputerForm";
import Modal from "../../ui/Modal";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 0.6fr;
  column-gap: 2.4rem;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Status = styled.div`
  padding: 0.4rem 1.4rem;
  height: fit-content;
  width: fit-content;
  border-radius: 4px;
  text-transform: capitalize;

  ${(props) =>
    props.type === "available" &&
    css`
      background-color: var(--color-green-100);
      color: var(--color-green-700);
    `}

  ${(props) =>
    props.type === "booked" &&
    css`
      background-color: var(--color-yellow-100);
      color: var(--color-yellow-700);
    `}

  ${(props) =>
    props.type === "used" &&
    css`
      background-color: var(--color-red-100);
      color: var(--color-red-700);
    `}
`;

Status.defaultProps = {
  type: "available",
};

function ComputerRow({ computer }) {
  const { isDeleting, deleteComputer } = useDeleteComputer();

  const {
    id: computerId,
    name,
    availablePackage,
    status,
    statusUntil,
  } = computer;

  return (
    <TableRow role="row">
      <div>{name}</div>
      <div>
        {availablePackage.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </div>
      <Status>{status}</Status>
      <div>{statusUntil}</div>
      <ButtonGroup>
        <Modal>
          <Modal.Open opens="update">
            <Button size="small">Edit</Button>
          </Modal.Open>
          <Modal.Window name="update" title="Edit Computer">
            <CreateComputerForm computerToEdit={computer} />
          </Modal.Window>
        </Modal>

        <Button
          size="small"
          variation="danger"
          disabled={isDeleting}
          onClick={() => deleteComputer(computerId)}
        >
          Delete
        </Button>
      </ButtonGroup>
    </TableRow>
  );
}

export default ComputerRow;
