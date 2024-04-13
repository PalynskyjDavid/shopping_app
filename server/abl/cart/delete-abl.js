const path = require("path");
const Ajv = require("ajv").default;
const CartDao = require("../../dao/cart-dao.js");
let dao = new CartDao(
    path.join(__dirname, "..", "..", "storage", "carts.json")
);

async function DeleteAbl(req, res) {
    console.log("Deleting: ", req.params);
    const id = req.params.cardId;
    await dao.deleteCart(id);
    res.json({});
}


// let schema = {
//     type: "object",
//     properties: {
//         Id: { type: "string" },
//     },
//     required: ["Id"],
// };

// async function DeleteAbl(req, res) {
//     console.log(req);
//     const ajv = new Ajv();
//     const valid = ajv.validate(schema, req.body);
//     try {
//         if (valid) {
//             const cartId = req.body.Id;
//             await dao.deleteSubject(cartId);
//             res.json({});
//         } else {
//             res.status(400).send({
//                 errorMessage: "validation of input failed",
//                 params: req.body,
//                 reason: ajv.errors,
//             });
//         }
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// }

module.exports = DeleteAbl;