const path = require("path");
const Ajv = require("ajv").default;
const CartDao = require("../../dao/cart-dao.js");
let dao = new CartDao(
    path.join(__dirname, "..", "..", "storage", "carts.json")
);

// async function DeleteAbl(req, res) {
//     const id = req.query.Id ? req.query.Id : req.body.Id;
//     console.log("Deleting: ", id);
//     //const id = req.params.id;
//     //console.log(req.params);
//     await dao.deleteCart(id);
//     res.json({});
// }


let schema = {
    type: "object",
    properties: {
        Id: { type: "string" },
    },
    required: ["Id"],
};


async function DeleteAbl(req, res) {
    // console.log(req.body.Id);
    // console.log(req.query.Id);
    // console.log(req.params.Id);
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.params);
    try {
        if (valid) {
            //const cartId = req.body.Id;
            //const cartId = req.query.Id ? req.query.Id : req.body.Id;
            const cartId = req.params.Id;
            //console.log("cartId: ", cartId);
            await dao.deleteCart(cartId);
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