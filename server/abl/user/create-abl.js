const path = require("path");
const Ajv = require("ajv").default;
const UserDao = require("../../dao/user-dao");
let dao = new UserDao(
  path.join(__dirname, "..", "..", "storage", "users.json")
);

const RoleDao = require("../../dao/role-dao.js")
let roleDao = new RoleDao(
    path.join(__dirname, "..", "..", "storage", "role.json")
);

let schema = {
    type: "object",
    properties: {
      Id: { type: "string" },
      RoleList: roleDao.listRoles(),
      PasswordHash: { type: "string", minLength: 4 },
      Name: { type: "string" },
      Surname: { type: "string" },
      Gender: { type: "bool" },
      Email: { type: "string" },
      Phone: { type: "number" },
      Address: { type: "string" },
      ThemeMode:  { type: "bool" }
    },
    required: ["Id", "RoleList", "PasswordHash", "Name", "Surname"],
  };

async function CreateAbl(req, res) {
  try {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.body);
    if (valid) {
      let user = req.body;
      user = await dao.createuser(user);
      res.json(user);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed | user create abl",
        params: req.body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    if (e.includes("user with Id ")) {
      res.status(400).send({ errorMessage: e, params: req.body });
    } else {
      res.status(500).send(e);
    }
  }
}

module.exports = CreateAbl;