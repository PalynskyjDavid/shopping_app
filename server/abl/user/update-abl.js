const path = require("path");
const Ajv = require("ajv").default;
const UserDao = require("../../dao/user-dao");
let dao = new UserDao(
    path.join(__dirname, "..", "..", "storage", "users.json")
);

// const ClassroomDao = require("../../dao/classroom-dao");
// let classroomDao = new ClassroomDao(
//   path.join(__dirname, "..", "..", "storage", "classrooms.json")
// );

let schema = {
    type: "object",
    properties: {
        Id: { type: "string" },
        RoleList: { type: "string" },
        PasswordHash: { type: "string"},
        Name: { type: "string" },
        Surname: { type: "string" },
        //Gender: { type: "bool" },
        Email: { type: "string" },
        Phone: { type: "number" },
        Address: { type: "string" },
        //ThemeMode: { type: "bool" }
    },
    required: ["Id"],
};

async function UpdateAbl(req, res) {
    try {

        console.log(req.body);

        const ajv = new Ajv();
        let user = req.body;
        const valid = ajv.validate(schema, user);

        console.log(user);
        console.log(valid);

        if (valid) {
            user = await dao.updateUser(user);
            res.json(user);
        } else {
            res.status(400).send({
                errorMessage: "validation of input failed",
                params: user,
                reason: ajv.errors,
            });
        }
    } catch (e) {
        if (e.message.startsWith("User with given id")) {
            res.status(400).json({ error: e.message });
        }
        console.log("Sending error", e);

        res.status(500).send(e);
    }
}

module.exports = UpdateAbl;