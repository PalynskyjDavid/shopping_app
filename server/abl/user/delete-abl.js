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

async function DeleteAbl(req, res) {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.params);
    //console.log(req.params);
    try {
        if (valid) {
            const userId = req.params.Id;
            await dao.deleteUser(userId);
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