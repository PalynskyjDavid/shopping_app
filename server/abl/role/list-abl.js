const path = require("path");
const Ajv = require("ajv").default;
const RoleDao = require("../../dao/role-dao");
let dao = new RoleDao(
  path.join(__dirname, "..", "..", "storage", "roles.json")
);

let schema = {
  type: "object",
  properties: {},
  required: [],
};

async function ListAbl(req, res) {
  try {
    const roles = await dao.listRoles();
    res.json(roles);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = ListAbl;