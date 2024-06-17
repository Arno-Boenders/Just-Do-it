const tableName = "categories";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  await knex(tableName).insert([
    { name: "Default", slug: "/" },
    { name: "Household", slug: "/Household" },
    { name: "Groceries", slug: "/Groceries" },
  ]);
};

export { seed };
