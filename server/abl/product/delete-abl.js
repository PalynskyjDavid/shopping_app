const path = require("path");
const Ajv = require("ajv").default;
const UserDao = require("../../dao/product-dao.js");
let dao = new UserDao(
    path.join(__dirname, "..", "..", "storage", "products.json")
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
            const productId = req.params.Id;
            await dao.deleteProduct(productId);
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