"use strict";
const fs = require("fs");
const path = require("path");

const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "roles.json");

class RolesDao {
  constructor(storagePath) {
    this.roleStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  async createRole(role) {
    let rolelist = await this._loadAllRoles();
    let currentRole = rolelist.find(
      (item) => item.shortName === role.shortName
    );
    if (currentRole) {
      throw `role with shortName ${role.shortName} already exists in db`;
    }
    role.id = crypto.randomBytes(8).toString("hex");
    rolelist.push(role);
    await wf(this._getStorageLocation(), JSON.stringify(rolelist, null, 2));
    return role;
  }

  async getRole(id) {
    let rolelist = await this._loadAllRoles();
    const result = rolelist.find((b) => b.id === id);
    return result;
  }

  async updateRole(role) {
    let rolelist = await this._loadAllRoles();
    const roleIndex = rolelist.findIndex((b) => b.id === role.id);
    if (roleIndex < 0) {
      throw new Error(`role with given id ${role.id} does not exists`);
    } else {
      rolelist[roleIndex] = {
        ...rolelist[roleIndex],
        ...role,
      };
    }
    await wf(this._getStorageLocation(), JSON.stringify(rolelist, null, 2));
    return rolelist[roleIndex];
  }

  async deleteRole(id) {
    let rolelist = await this._loadAllRoles();
    const roleIndex = rolelist.findIndex((b) => b.id === id);
    if (roleIndex >= 0) {
      rolelist.splice(roleIndex, 1);
    }
    await wf(this._getStorageLocation(), JSON.stringify(rolelist, null, 2));
    return {};
  }

  async listRoles() {
    let rolelist = await this._loadAllRoles();
    return rolelist;
  }

  async _loadAllRoles() {
    let rolelist;
    try {
      rolelist = JSON.parse(await rf(this._getStorageLocation()));
    } catch (e) {
      if (e.code === "ENOENT") {
        console.info("No storage found, initializing new one...");
        rolelist = [];
      } else {
        throw new Error(
          "Unable to read from storage. Wrong data format. " +
            this._getStorageLocation()
        );
      }
    }
    return rolelist;
  }

  _getStorageLocation() {
    return this.roleStoragePath;
  }
}

module.exports = RolesDao;