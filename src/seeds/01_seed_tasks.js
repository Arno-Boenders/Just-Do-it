const tableName = "tasks";

const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  await knex(tableName).insert([
    {
      content: "Working for programming 3",
      is_done: false,
      category_id: 1,
      user_id: 1,
    },
    {
      content: "Chatting with other students",
      is_done: false,
      category_id: 1,
      user_id: 6,
    },
    {
      content: "Doing some homework",
      is_done: true,
      category_id: 1,
      user_id: 6,
    },
    { content: "Doing dishes", is_done: false, category_id: 2, user_id: 6 },
    { content: "Butter", is_done: true, category_id: 3, user_id: 1 },
  ]);
};

export { seed };
