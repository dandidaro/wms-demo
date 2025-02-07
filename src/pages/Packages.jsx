import CreatePackageForm from "../features/packages/CreatePackageForm";
import PackageTable from "../features/packages/PackageTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import Row from "../ui/Row";

function Packages() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All packages</Heading>
        <Modal>
          <Modal.Open opens="create">
            <Button size="medium">Add New</Button>
          </Modal.Open>
          <Modal.Window name="create" title="Create New Package">
            <CreatePackageForm />
          </Modal.Window>
        </Modal>
      </Row>
      <Row>
        <PackageTable />
      </Row>
    </>
  );
}

export default Packages;
