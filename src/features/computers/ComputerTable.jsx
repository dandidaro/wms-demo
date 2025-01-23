import styled from "styled-components";

import useComputers from "./useComputers";
import ComputerRow from "./ComputerRow";
import Spinner from "../../ui/Spinner";

const Table = styled.div`
  border: 1px solid var(--color-grey-100);

  font-size: 1.4rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 0.6fr;
  column-gap: 2.4rem;
  padding: 1.4rem 2.4rem;

  background-color: var(--color-grey-100);
  font-weight: 600;
  font-size: small;
`;

function ComputerTable() {
  const { isLoading, computers, error } = useComputers();

  if (isLoading) return <Spinner />;
  if (error) return <p>Sorry. {error.message}</p>;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Name</div>
        <div>Available Package</div>
        <div>Status</div>
        <div>Status Until</div>
        <div>Actions</div>
      </TableHeader>
      {computers.map((computer) => (
        <ComputerRow computer={computer} key={computer.id} />
      ))}
    </Table>
  );
}

export default ComputerTable;
