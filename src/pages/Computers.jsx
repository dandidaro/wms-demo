import ComputerTable from "../features/computers/ComputerTable";
import Button from "../ui/Button";
import Row from "../ui/Row";
import CreateComputerForm from "../features/computers/CreateComputerForm";
import Modal from "../ui/Modal";

function Computers() {
  return (
    <>
      <Row type="horizontal">
        <h1>All computers</h1>
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
        <ComputerTable />
      </Row>
    </>
  );
}

export default Computers;
