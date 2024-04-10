"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "products.json");

class ProductsDao {
  constructor(storagePath) {
    this.productStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  async createProduct(product) {
    let productlist = await this._loadAllProducts();
    let currentProduct = productlist.find(
      (item) => item.Id === porduct.Id
    );
    if (currentProduct) {
      throw `product with Id ${product.Id} already exists in db`;
    }
    product.id = crypto.randomBytes(8).toString("hex");
    productlist.push(product);
    await wf(this._getStorageLocation(), JSON.stringify(productlist, null, 2));
    return product;
  }

  async getProduct(id) {
    let productlist = await this._loadAllProducts();
    const result = productlist.find((b) => b.id === id);
    return result;
  }

  async updateProducts(product) {
    let productlist = await this._loadAllProducts();
    const productIndex = productlist.findIndex((b) => b.id === product.id);
    if (productIndex < 0) {
      throw new Error(`Product with given id ${product.id} does not exists.`);
    } else {
      productlist[productIndex] = {
        ...productlist[productIndex],
        ...product,
      };
    }
    await wf(this._getStorageLocation(), JSON.stringify(productlist, null, 2));
    return productlist[productIndex];
  }

  async deleteProduct(id) {
    let productlist = await this._loadAllProducts();
    const productIndex = productlist.findIndex((b) => b.id === id);
    if (productIndex >= 0) {
      productlist.splice(productIndex, 1);
    }
    await wf(this._getStorageLocation(), JSON.stringify(productlist, null, 2));
    return {};
  }

  async listProducts() {
    let productlist = await this._loadAllProducts();
    return productlist;
  }

  async _loadAllProducts() {
    let productlist;
    try {
      productlist = JSON.parse(await rf(this._getStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No storage found, initializing new one...");
        productlist = [];
      } else {
        throw new Error(
          "Unable to read from storage. Wrong data format. " +
            this._getStorageLocation()
        );
      }
    }
    return productlist;
  }

  _getStorageLocation() {
    return this.productStoragePath;
  }
}

module.exports = ProductsDao;