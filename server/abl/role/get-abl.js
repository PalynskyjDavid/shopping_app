const path = require("path");
const Ajv = require("ajv").default;
const UserDao = require("../../dao/role-dao.js");
let dao = new UserDao(
  path.join(__dirname, "..", "..", "storage", "roles.json")
);

let schema = {
  type: "object",
  properties: {
    Id: { type: "string" },
  },
  required: ["Id"],
};

async function GetAbl(req, res) {
  try {
    const ajv = new Ajv();
    const body = req.query.Id ? req.query : req.body;
    const valId = ajv.validate(schema, body);
    if (valId) {
      const roleId = body.Id;
      const role = await dao.getRole(roleId);
      if (!role) {
        res
          .status(400)
          .send({ error: `role with Id '${roleId}' doesn't exist.` });
      }
      res.json(role);
    } else {
      res.status(400).send({
        errorMessage: "valIdation of input failed",
        params: body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = GetAbl;