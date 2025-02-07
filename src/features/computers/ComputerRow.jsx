import styled, { css } from "styled-components";

import { useDeleteComputer } from "./useDeleteComputer";
import CreateComputerForm from "./CreateComputerForm";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Status = styled.div`
  padding: 0.4rem 1.4rem;
  height: fit-content;
  width: fit-content;
  border-radius: 4px;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.3rem;

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

function ComputerRow({ computer, packages }) {
  const { isDeleting, deleteComputer } = useDeleteComputer();

  const { id: computerId, name, status, statusUntil } = computer;

  return (
    <Table.Row role="row">
      <div>{name}</div>
      <div>
        {packages.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </div>
      <Status type={status}>{status}</Status>
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

        <Modal>
          <Modal.Open opens="delete">
            <Button size="small" variation="danger">
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="delete" title="Delete Computer">
            <ConfirmDelete
              resourceCategory="Computer"
              resourceName={name}
              disabled={isDeleting}
              onConfirm={() => deleteComputer(computerId)}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </Table.Row>
  );
}

export default ComputerRow;
