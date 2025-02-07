import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getComputers({ filter, page }) {
  let query = supabase
    .from("computers")
    .select(`id, created_at, name, status, packages(id, name)`, {
      count: "exact",
    })
    .order("id", { ascending: false });

  // FILTER
  if (filter !== null) query = query.eq(filter.field, filter.value);

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data: computers, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Computers could not be loaded");
  }
  return { computers, count };
}

export async function getComputersToPackages() {
  let { data: computers, error } = await supabase
    .from("computers")
    .select(`id, created_at, name, status, packages(id, name)`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("Computers could not be loaded");
  }
  return computers;
}

export async function createUpdateComputer({ newComputer, id }) {
  const { packages, ...computerData } = newComputer;

  // 1. Adding or editing PC, basically PC name column
  // Should be done first before adding packages to avoid
  // conflict and returning new ID (if create new)
  let query = supabase.from("computers");

  if (id) query = query.update({ name: computerData.name }).eq("id", id);
  if (!id) query = query.insert({ name: computerData.name });

  const { data, error } = await query.select(`id, name`);

  // Error handling of adding or editing PC
  if (error) {
    throw new Error("Computer could not be created");
  }

  // 2. Upsert selected package to JOIN table
  // 2.1. Construct new object for upsert
  const selectedPackage = packages.map((item) => ({
    computerId: id ? id : data[0].id,
    packageId: item.id,
  }));

  // 2.2. API send
  let queryAddComputerPackage = supabase.from("computerPackage");

  if (id)
    queryAddComputerPackage = queryAddComputerPackage.upsert(selectedPackage);
  if (!id)
    queryAddComputerPackage = queryAddComputerPackage.insert(selectedPackage);

  const { error: errorAddPackage } = await queryAddComputerPackage;

  // 2.3. Error handling
  if (errorAddPackage) throw new Error("Error when adding package");

  // 3. Delete unselected package in JOIN table
  // 3.1. Construct list of unselected package to STRING
  let queryForSelectedPackage = "(";
  selectedPackage
    .map((item) => item.packageId)
    .forEach((element, index) => {
      queryForSelectedPackage += element;
      if (index !== selectedPackage.length - 1) queryForSelectedPackage += ",";
    });
  queryForSelectedPackage += ")";

  // 3.2. API send
  if (!id) return;
  const { error: errorDeletePackage } = await supabase
    .from("computerPackage")
    .delete()
    .not("packageId", "in", queryForSelectedPackage)
    .eq("computerId", id);

  // 3.3. Error handling
  if (errorDeletePackage) throw new Error("Error when updating package");
}

export async function deleteComputer(id) {
  const { error } = await supabase.from("computers").delete().eq("id", id);

  if (error) {
    throw new Error("Computers could not be deleted");
  }
}
