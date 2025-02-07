import { formatCurrency } from "../../utils/helpers";

import { useDeletePackage } from "./useDeletePackage";
import CreatePackageForm from "./CreatePackageForm";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function PackageRow({ packages }) {
  const { isDeleting, deletePackage } = useDeletePackage();

  const {
    id: packageId,
    name,
    price,
    dayAvailable,
    minHourDuration,
  } = packages;

  return (
    <Table.Row role="row">
      <div>{name}</div>
      <div>{formatCurrency(price)}</div>
      <div>
        <span>
          {dayAvailable.map((day, index) => {
            if (index !== dayAvailable.length - 1) return day + ", ";
            else return day;
          })}
        </span>
      </div>
      <div>{minHourDuration} Hour(s)</div>

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="update">
            <Button size="small">Edit</Button>
          </Modal.Open>
          <Modal.Window name="update" title="Edit Package">
            <CreatePackageForm packageToEdit={packages} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens="delete">
            <Button size="small" variation="danger">
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="delete" title="Delete Package">
            <ConfirmDelete
              resourceCategory="Package"
              resourceName={name}
              disabled={isDeleting}
              onConfirm={() => deletePackage(packageId)}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </Table.Row>
  );
}

export default PackageRow;
