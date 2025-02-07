import supabase from "./supabase";

export async function getPackages() {
  let { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("Packages could not be loaded");
  }
  return packages;
}

// export async function getComputers() {
//   let { data: computers, error } = await supabase
//     .from("computers")
//     .select("*")
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.log(error);
//     throw new Error("Computers could not be loaded");
//   }
//   return computers;
// }

export async function createUpdatePackage({ newPackage, id }) {
  let query = supabase.from("packages");

  if (id) query = query.update(newPackage).eq("id", id);
  if (!id) query = query.insert(newPackage);

  const { error } = await query.select();

  if (error) throw new Error("Package could not be crated");
}

export async function deletePackage(id) {
  const { error } = await supabase.from("packages").delete().eq("id", id);

  if (error) throw new Error("Package could not be deleted");
}
