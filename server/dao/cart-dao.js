"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "cart.json");

class CartsDao {
  constructor(storagePath) {
    this.cartStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  async createCart(cart) {
    let cartlist = await this._loadAllCarts();
    let currentCart = cartlist.find(
      (item) => item.name === cart.name
    );
    if (currentCart) {
      throw `cart with name ${cart.name} already exists in db`;
    }
    cart.id = crypto.randomBytes(8).toString("hex");
    cartlist.push(cart);
    await wf(this._getStorageLocation(), JSON.stringify(cartlist, null, 2));
    return cart;
  }

  async getCart(id) {
    let cartlist = await this._loadAllCarts();
    const result = cartlist.find((b) => b.id === id);
    return result;
  }

  async updateCart(cart) {
    let cartlist = await this._loadAllCarts();
    const cartIndex = cartlist.findIndex((b) => b.id === cart.id);
    if (cartIndex < 0) {
      throw new Error(`cart with given id ${cart.id} does not exists`);
    } else {
      cartlist[cartIndex] = {
        ...cartlist[cartIndex],
        ...cart,
      };
    }
    await wf(this._getStorageLocation(), JSON.stringify(cartlist, null, 2));
    return cartlist[cartIndex];
  }

  async deleteCart(id) {
    let cartlist = await this._loadAllCarts();
    const cartIndex = cartlist.findIndex((b) => b.id === id);
    if (cartIndex >= 0) {
      cartlist.splice(cartIndex, 1);
    }
    await wf(this._getStorageLocation(), JSON.stringify(cartlist, null, 2));
    return {};
  }

  async listCarts() {
    let cartlist = await this._loadAllCarts();
    return cartlist;
  }

  async _loadAllCarts() {
    let cartlist;
    try {
      cartlist = JSON.parse(await rf(this._getStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No storage found, initializing new one...");
        cartlist = [];
      } else {
        throw new Error(
          "Unable to read from storage. Wrong data format. " +
            this._getStorageLocation()
        );
      }
    }
    return cartlist;
  }

  _getStorageLocation() {
    return this.cartStoragePath;
  }
}

module.exports = CartsDao;