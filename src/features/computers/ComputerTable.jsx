import useComputers from "./useComputers";
import ComputerRow from "./ComputerRow";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function ComputerTable() {
  const { isLoading, computers, error, count } = useComputers();

  if (isLoading) return <Spinner />;
  if (error) return <p>Sorry. {error.message}</p>;

  return (
    <>
      <Table columns="1fr 2fr 1fr 1fr 0.6fr">
        <Table.Header>
          <div>Name</div>
          <div>Available Package</div>
          <div>Status</div>
          <div>Status Until</div>
          <div>Actions</div>
        </Table.Header>

        <Table.Body
          data={computers}
          render={(computer) => (
            <ComputerRow
              computer={computer}
              packages={computer.packages ? computer.packages : "Loading"}
              key={computer.id}
            />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </>
  );
}

export default ComputerTable;
