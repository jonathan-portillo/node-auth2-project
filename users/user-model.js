const db = require("../database/connections.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
};

function find() {
  return db("users").select("id", "username").orderBy("id");
}

function findBy(filter) {
  return db("users as u", "u.department", "d.id")
    .select("u.id", "d.name as department name", "u.password")
    .where(filter)
    .orderBy("u.id");
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first;
}
