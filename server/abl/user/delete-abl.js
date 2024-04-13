const path = require("path");
const Ajv = require("ajv").default;
const UserDao = require("../../dao/user-dao.js");
let dao = new UserDao(
    path.join(__dirname, "..", "..", "storage", "users.json")
);


async function DeleteAbl(req, res) {
    const body = req.query.Id ? req.query : req.body;
    console.log("Deleting user with id: ", body.Id);
}

module.exports = DeleteAbl;