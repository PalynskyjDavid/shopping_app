const path = require("path");
const Ajv = require("ajv").default;
const ProductDao = require("../../dao/product-dao");
let dao = new ProductDao(
  path.join(__dirname, "..", "..", "storage", "products.json")
);

let schema = {
  type: "object",
  properties: {},
  required: [],
};

async function ListAbl(req, res) {
  try {
    const products = await dao.listProducts();
    res.json(products);
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = ListAbl;