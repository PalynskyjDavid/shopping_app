const path = require("path");
const Ajv = require("ajv").default;
const CartDao = require("../../dao/cart-dao.js");
let dao = new CartDao(
  path.join(__dirname, "..", "..", "storage", "carts.json")
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
      const cartId = body.Id;
      const cart = await dao.getCart(cartId);
      if (!cart) {
        res
          .status(400)
          .send({ error: `Cart with Id '${cartId}' doesn't exist.` });
      }
      res.json(cart);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = GetAbl;