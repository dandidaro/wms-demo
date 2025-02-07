import ComputerTable from "../features/computers/ComputerTable";
import Button from "../ui/Button";
import Row from "../ui/Row";
import CreateComputerForm from "../features/computers/CreateComputerForm";
import ComputerTableOperations from "../features/computers/ComputerTableOperations";
import Modal from "../ui/Modal";
import Heading from "../ui/Heading";

function Computers() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All computers</Heading>
        <Modal>
          <Modal.Open opens="create">
            <Button size="medium">Add New</Button>
          </Modal.Open>
          <Modal.Window name="create" title="Create New Computer">
            <CreateComputerForm />
          </Modal.Window>
        </Modal>
      </Row>
      <Row>
        <ComputerTableOperations />
        <ComputerTable />
      </Row>
    </>
  );
}

export default Computers;
