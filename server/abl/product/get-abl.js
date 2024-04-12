const path = require("path");
const Ajv = require("ajv").default;
const ProductDao = require("../../dao/product-dao.js");
let dao = new ProductDao(
  path.join(__dirname, "..", "..", "storage", "products.json")
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
      const productId = body.Id;
      const product = await dao.getProduct(productId);
      if (!product) {
        res
          .status(400)
          .send({ error: `Product with Id '${productId}' doesn't exist.` });
      }
      res.json(product);
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