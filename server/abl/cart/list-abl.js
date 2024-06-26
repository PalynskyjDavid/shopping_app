const path = require("path");
const Ajv = require("ajv").default;
const CartDao = require("../../dao/cart-dao");
let dao = new CartDao(
  path.join(__dirname, "..", "..", "storage", "carts.json")
);

let schema = {
  type: "object",
  properties: {},
  required: [],
};

async function ListAbl(req, res) {
  try {
    const carts = await dao.listCarts();
    res.json(carts);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = ListAbl;