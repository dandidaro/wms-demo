import usePackages from "./usePackages";

import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import PackageRow from "./PackageRow";

function PackageTable() {
  const { isLoading, packages, error } = usePackages();
  if (isLoading) return <Spinner />;
  if (error) return <p>Sorry. {error.message}</p>;

  return (
    <Table columns="1.6fr 0.8fr 1.4fr 1fr 0.6fr">
      <Table.Header>
        <div>Name</div>
        <div>Price</div>
        <div>Available Days</div>
        <div>Minimal Duration</div>
        <div>Actions</div>
      </Table.Header>

      <Table.Body
        data={packages}
        render={(packageItem) => (
          <PackageRow packages={packageItem} key={packageItem.id} />
        )}
      />
    </Table>
  );
}

export default PackageTable;
