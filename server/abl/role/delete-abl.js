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
  const valid = ajv.validate(schema, req.params);
  try {
    if (valid) {
      const roleId = req.params.Id//req.body.Id;
      console.log(roleId);
      await dao.deleteRole(roleId);
      res.json({});
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: req.params,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = DeleteAbl;