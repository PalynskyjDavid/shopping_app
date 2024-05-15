const express = require("express");
const router = express.Router();



/*PASSING DATA WITH REST API*/
//by params "/get/David"
router.get("/get/:Id", async (req, res) => {
    await GetAbl(req, res);
});

function GetAbl(req, res) {
    const param = req.params.Id;
    console.log(`Data passed by params: ${param}`);
};
//by query "/get?Name=David"
// router.get("/get", (req, res) => {
//     console.log("asdf");
//     //const query = req.query;
//     const body = req.query.Name ? req.query : req.body;
//     console.log(`Data passed by query: ${body}`);
// });

// //by body as json "/get + {Name: "David"}"
// router.get("/get", async (req, res) => {
//     await GetAbl(req, res);
// });

/*// http://localhost:8000/cart/delete/1

router.delete("/delete/:id", async (req, res) => {
    await DeleteAbl(req, res);
});

// http://localhost:8000/cart/delete/cartsid1
//router.delete("/delete/:cartsid", async (req, res) => {
//router.delete("/delete/cardId:id", async (req, res) => {
//router.delete("/delete/delete/cartsid:id", async (req, res) => {*/

router.post("/create", async (req, res) => {
    await CreateAbl(req, res);
});

router.delete("/delete/:id", async (req, res) => {
    //console.log("REQ: ",req);
    await DeleteAbl(req, res);
});

router.post("/update", async (req, res) => {
    await UpdateAbl(req, res);
});

router.get("/list", async (req, res) => {
    await ListAbl(req, res);
});

module.exports = router;