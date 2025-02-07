import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

const options = [
  { value: "all", label: "All" },
  { value: "booked", label: "Booked" },
  { value: "used", label: "Used" },
];

function ComputerTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="status" options={options} />
    </TableOperations>
  );
}

export default ComputerTableOperations;
