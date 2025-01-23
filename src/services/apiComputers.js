import supabase from "./supabase";

export async function getComputers() {
  let { data: computers, error } = await supabase
    .from("computers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("Computers could not be loaded");
  }
  return computers;
}

export async function createUpdateComputer({ newComputer, id }) {
  let query = supabase.from("computers");

  if (id) query = query.update(newComputer).eq("id", id);
  if (!id) query = query.insert(newComputer);

  const { error } = await query.select();

  // 2. Check IF error
  if (error) {
    throw new Error("Computer could not be created");
  }
}

export async function deleteComputer(id) {
  const { error } = await supabase.from("computers").delete().eq("id", id);

  if (error) {
    throw new Error("Computers could not be deleted");
  }
}
