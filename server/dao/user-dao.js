"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "users.json");

class UsersDao {
  constructor(storagePath) {
    this.userStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  async createUser(user) {
    let userlist = await this._loadAllUsers();
    let currentUser = userlist.find(
      (item) => item.Id === user.Id
    );
    if (currentUser) {
      throw `user with Id ${user.Id} already exists in db`;
    }
    user.id = crypto.randomBytes(8).toString("hex");
    userlist.push(user);
    await wf(this._getStorageLocation(), JSON.stringify(userlist, null, 2));
    return user;
  }

  async getUser(id) {
    let userlist = await this._loadAllUsers();
    const result = userlist.find((b) => b.Id === id);
    return result;
  }

  async updateUser(user) {
    let userlist = await this._loadAllUsers();
    const userIndex = userlist.findIndex((b) => b.id === user.id);
    if (userIndex < 0) {
      throw new Error(`user with given id ${user.id} does not exists.`);
    } else {
      userlist[userIndex] = {
        ...userlist[userIndex],
        ...user,
      };
    }
    await wf(this._getStorageLocation(), JSON.stringify(userlist, null, 2));
    return userlist[userIndex];
  }

  async deleteUser(id) {
    let userlist = await this._loadAllUsers();
    const userIndex = userlist.findIndex((b) => b.id === id);
    if (userIndex >= 0) {
      userlist.splice(userIndex, 1);
    }
    await wf(this._getStorageLocation(), JSON.stringify(userlist, null, 2));
    return {};
  }

  async listUsers() {
    let userlist = await this._loadAllUsers();
    return userlist;
  }

  async _loadAllUsers() {
    let userlist;
    try {
      userlist = JSON.parse(await rf(this._getStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No storage found, initializing new one...");
        userlist = [];
      } else {
        throw new Error(
          "Unable to read from storage. Wrong data format. " +
            this._getStorageLocation()
        );
      }
    }
    return userlist;
  }

  _getStorageLocation() {
    return this.userStoragePath;
  }
}

module.exports = UsersDao;