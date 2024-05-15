const path = require("path");
const Ajv = require("ajv").default;
const roleDao = require("../../dao/role-dao.js");
let dao = new roleDao(
  path.join(__dirname, "..", "..", "storage", "roles.json")
);

let schema = {
  type: "object",
  properties: {
    Id: { type: "string" },
    Name: { type: "string" }
  },
  required: [/*"Id",*/ "Name"],
};

async function CreateAbl(req, res) {
  try {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.body);
    if (valid) {
      let role = req.body;
      role = await dao.createRole(role);
      res.json(role);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: req.body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    if (e.includes("role with Name ")) {
      res.status(400).send({ 
        errorMessage: e, 
        params: req.body });
    } else {
      res.status(500).send(e);
    }
  }
}

module.exports = CreateAbl;