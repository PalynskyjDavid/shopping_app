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

// let schema = {
//     type: "object",
//     properties: {
//       Id: { type: "string" },
//       RoleList: { type: "bool" },//roleDao.listRoles(), //["admin", "user", "bot"]
//       PasswordHash: { type: "string", minLength: 4 },
//       Name: { type: "string" },
//       Surname: { type: "string" },
//       Gender: { type: "bool" },
//       Email: { type: "string" },
//       Phone: { type: "number" },
//       Address: { type: "string" },
//       ThemeMode: { type: "bool" }
//     },
//     required: ["Id", "RoleList", "PasswordHash", "Name", "Surname"],
//   };

let schema = {
  type: "object",
  properties: {
    PasswordHash: { type: "string", minLength: 4 },
    Name: { type: "string" },
    Surname: { type: "string" },
    Gender: { type: "boolean" },
    Email: { type: "string" },
    Phone: { type: "number" },
    Address: { type: "string" },
  },
  //Default nefunguje
  //"default":{"Email": "abcd@abcd.abcd"},
  required: [/*"Id", "RoleList",*/ "PasswordHash", "Name", "Surname", "Email"],
};

// const ajv = new Ajv({processCode: transpileFunc})
// const validate = ajv.compile(schema) // transpiled es7 async function
// validate(data).then(successFunc).catch(errorFunc)

async function CreateAbl(req, res) {

  let defaultUser = {
    RoleList: "1",
    Gender: true,
    Phone: 987654321,
    Address: "New Address",
    ThemeMode: false
  };
  let user = {...defaultUser, ...req.body};

  try {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, user/*req.body*/);
    //console.log(valid, req.body.Email);
    if (valid) {
      //console.log(user);
      user = await dao.createUser(user);
      res.json(user);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed | user create abl",
        params: req.body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    if (e) {//.includes("user with Id ")) {
      res.status(400).send({
        errorMessage: e,
        params: req.body
      });
    } else {
      res.status(500).send(e);
    }
  }
}

module.exports = CreateAbl;