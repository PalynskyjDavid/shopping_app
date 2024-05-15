const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/user/create-abl.js");
const DeleteAbl = require("../abl/user/delete-abl.js");
const UpdateAbl = require("../abl/user/update-abl.js");
const GetAbl = require("../abl/user/get-abl.js");
const ListAbl = require("../abl/user/list-abl.js");

router.put("/create", async (req, res) => {
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