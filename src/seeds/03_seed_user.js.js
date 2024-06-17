import bcrypt from "bcrypt";

const tableName = "users";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).truncate();

  // password is "secret123"
  const password = "secret123";
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(hashedPassword);

  // insert 5 users with meta and different roles (1-3)
  await knex(tableName).insert([
    {
      firstname: "Batman",
      lastname: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
    },
    {
      firstname: "Robin",
      lastname: "Editor",
      email: "robin@example.com",
      password: hashedPassword,
    },
    {
      firstname: "Joker",
      lastname: "Reader",
      email: "joker@example.com",
      password: hashedPassword,
    },
    {
      firstname: "Catwoman",
      lastname: "Reader",
      email: "catwoman@example.com",
      password: hashedPassword,
    },
    {
      firstname: "Penguin",
      lastname: "Reader",
      email: "penguin@example.com",
      password: hashedPassword,
    },
  ]);
};

export { seed };
