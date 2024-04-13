const path = require("path");
const Ajv = require("ajv").default;
const RoleDao = require("../../dao/role-dao.js");
let dao = new RoleDao(
  path.join(__dirname, "..", "..", "storage", "roles.json")
);

let schema = {
  type: "object",
  properties: {
    Id: { type: "string" },
  },
  required: ["Id"],
};

async function DeleteAbl(req, res) {
  const ajv = new Ajv();
  const valid = ajv.validate(schema, req.body);
  try {
    if (valid) {
      const roleId = req.body.Id;
      await dao.deleteRole(roleId);
      res.json({});
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: req.body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = DeleteAbl;