const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/role/create-abl.js");
const DeleteAbl = require("../abl/role/delete-abl.js");
const UpdateAbl = require("../abl/role/update-abl.js");
const GetAbl = require("../abl/role/get-abl.js");
const ListAbl = require("../abl/role/list-abl.js");

router.post("/create", async (req, res) => {
    await CreateAbl(req, res);
});

router.post("/delete", async (req, res) => {
    await DeleteAbl(req, res);
});

router.post("/update", async (req, res) => {
    await UpdateAbl(req, res);
});

router.get("/get", async (req, res) => {
    await GetAbl(req, res);
});

router.get("/list", async (req, res) => {
    await ListAbl(req, res);
});

module.exports = router;