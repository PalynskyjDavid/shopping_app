const path = require("path");
const Ajv = require("ajv").default;
const CartDao = require("../../dao/cart-dao.js");
let dao = new CartDao(
  path.join(__dirname, "..", "..", "storage", "carts.json")
);

let schema = {
  type: "object",
  properties: {
    //Id: { type: "string"},
    UserId: { type: "string"},
    Name: { type: "string" },
    //TotalPrice: { type: "number"},
    //Availability: { type: "bool"}
  },
  required: ["UserId", "Name"],
};

async function CreateAbl(req, res) {

  let defaultCart = {
    TotalPrice: "0",
    Availability: false
  };
  let cart = {...defaultCart, ...req.body}

  try {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, cart);
    if (valid) {
      cart = await dao.createCart(cart);
      res.json(cart);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: req.body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

module.exports = CreateAbl;