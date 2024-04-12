const path = require("path");
const Ajv = require("ajv").default;
const UserDao = require("../../dao/user-dao.js");
let dao = new UserDao(
  path.join(__dirname, "..", "..", "storage", "users.json")
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
      const userId = body.Id;
      const user = await dao.getUser(userId);
      if (!user) {
        res
          .status(400)
          .send({ error: `User with Id '${userId}' doesn't exist.` });
      }
      res.json(user);
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