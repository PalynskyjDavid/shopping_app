const path = require("path");
const Ajv = require("ajv").default;
const ProductDao = require("../../dao/product-dao.js");
let dao = new ProductDao(
  path.join(__dirname, "..", "..", "storage", "product.json")
);

// const ProductDao = require("../../dao/product-dao.js");
// let productDao = new ProductDao(
//   path.join(__dirname, "..", "..", "storage", "product.json")
// );

/*tohle schema sem nepatri */
let schema = {
  type: "object",
  properties: {
    Id: { type: "string" },
    Name: { type: "string"},
    Brand: { type: "string"},
    Price: { type: "number"}
  },
  required: ["Id", "Name"],
};

async function CreateAbl(req, res) {
  try {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, req.body);
    if (valid) {
      let product = req.body;
      if (product.id) {
        let product = productDao.getProduct(product.id);
        if (!product) {
          res.status(400).send({
            errorMessage: `product with given id ${product.id} does not exist`,
            params: req.body,
            reason: ajv.errors,
          });
          return;
        }
      }
      product = await dao.createProduct(product);
      res.json(product);
    } else {
      res.status(400).send({
        errorMessage: "validation of input failed",
        params: req.body,
        reason: ajv.errors,
      });
    }
  } catch (e) {
    if (e.includes("product with Id ")) {
      res.status(400).send({ errorMessage: e, params: req.body });
    } else {
      res.status(500).send(e);
    }
  }
}

module.exports = CreateAbl;