const path = require("path");
const Ajv = require("ajv").default;
const ProductDao = require("../../dao/product-dao");
let dao = new ProductDao(
  path.join(__dirname, "..", "..", "storage", "products.json")
);

const ClassroomDao = require("../../dao/classroom-dao");
let classroomDao = new ClassroomDao(
  path.join(__dirname, "..", "..", "storage", "classroom.json")
);

/*tohle schema sem nepatri */
let schema = {
  type: "object",
  properties: {
    Id: { type: "" },
    RoleList: { type: "" },
    PasswordHash: { type: "" },
    Name: { type: "" },
    Surname: { type: "" },
    Gender: { type: "" },
    Email: { type: "" },
    Phone: { type: "" },
    Address: { type: "" },
    ThemeMode:  { type: "" }
  },
  required: ["Id", "RoleList", "PasswordHash", "Name", "Surname"],
};

async function CreateAbl(req, res) {
  try {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.body);
    if (valid) {
      let student = req.body;
      if (student.classroomId) {
        let classroom = classroomDao.getClassroom(student.classroomId);
        if (!classroom) {
          res.status(400).send({
            errorMessage: `classroom with given id ${student.classroomId} does not exist`,
            params: req.body,
            reason: ajv.errors,
          });
          return;
        }
      }
      student = await dao.createStudent(student);
      res.json(student);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: req.body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    if (e.includes("student with nationalId ")) {
      res.status(400).send({ errorMessage: e, params: req.body });
    } else {
      res.status(500).send(e);
    }
  }
}

module.exports = CreateAbl;