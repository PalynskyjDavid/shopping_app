const express = require("express");
const router = express.Router();

// const CreateAbl = require("../abl//create-abl.js");
// const DeleteAbl = require("../abl//delete-abl.js");
// const UpdateAbl = require("../abl//update-abl.js");
// const GetAbl = require("../abl//get-abl.js");
// const ListAbl = require("../abl//list-abl.js");

const CreateAbl = require("../abl/product/create-abl.js");
const DeleteAbl = require("../abl/product/delete-abl.js");
const UpdateAbl = require("../abl/product/update-abl.js");
const GetAbl = require("../abl/product/get-abl.js");
const ListAbl = require("../abl/product/list-abl.js");

router.post("/create", async (req, res) => {
    await CreateAbl(req, res);
});

router.delete("/delete/:Id", async (req, res) => {
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