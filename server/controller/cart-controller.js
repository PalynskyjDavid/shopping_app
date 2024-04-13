const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/cart/create-abl.js");
const DeleteAbl = require("../abl/cart/delete-abl.js");
const UpdateAbl = require("../abl/cart/update-abl.js");
const GetAbl = require("../abl/cart/get-abl.js");
const ListAbl = require("../abl/cart/list-abl.js");

router.post("/create", async (req, res) => {
    await CreateAbl(req, res);
});

//router.delete("/delete/cardId:id", async (req, res) => {
//router.delete("/delete/delete/cartsid:id", async (req, res) => {
    router.delete("/delete/:id", async (req, res) => {
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