const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/product/create-abl.js");
const DeleteAbl = require("../abl/product/delete-abl.js");
const UpdateAbl = require("../abl/product/update-abl.js");
const GetAbl = require("../abl/product/get-abl.js");
const ListAbl = require("../abl/product/list-abl.js");

router.put("/", async (req, res) => {
    await CreateAbl(req, res);
});

router.delete("/:Id", async (req, res) => {
    await DeleteAbl(req, res);
});

router.post("/", async (req, res) => {
    await UpdateAbl(req, res);
});

router.get("/", async (req, res) => {
    await GetAbl(req, res);
});

router.get("/list", async (req, res) => {
    await ListAbl(req, res);
});

module.exports = router;