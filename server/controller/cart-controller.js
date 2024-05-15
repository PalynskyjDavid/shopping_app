const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/cart/create-abl.js");
const DeleteAbl = require("../abl/cart/delete-abl.js");
const UpdateAbl = require("../abl/cart/update-abl.js");
const GetAbl = require("../abl/cart/get-abl.js");
const ListAbl = require("../abl/cart/list-abl.js");

router.put("/create", async (req, res) => {
    await CreateAbl(req, res);
});

// http://localhost:8000/cart/delete/1
/*
router.delete("/delete/:id", async (req, res) => {
    await DeleteAbl(req, res);
});
*/
// http://localhost:8000/cart/delete/cartsid1
//router.delete("/delete/:cartsid", async (req, res) => {
//router.delete("/delete/cardId:id", async (req, res) => {
//router.delete("/delete/delete/cartsid:id", async (req, res) => {
router.delete("/delete/:Id", async (req, res) => {
//router.delete("/delete", async (req, res) => {
    //console.log("REQ: ",req);
    //console.log("ID?: ", req.params.Id);
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