//db
const pool = require("./dao/database");

//modules
const express = require("express");

//const Router = rqeuire("./controller/-controller")
const productRouter = require("./controller/product-controller.js");
const cartRouter = require("./controller/cart-controller.js");
const userRouter = require("./controller/user-controller.js");
const roleRouter = require("./controller/role-controller.js");
const testRouter = require("./controller/test-controller.js");

//server initialization
const app = express();

//port
const PORT = 8000;

//allows server to recieve json files
app.use(express.json());

//default routes
app.get("/", (req, res) => {
    res.send("- Shopping app -")
})

//routes
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/user", userRouter);
app.use("/role", roleRouter);
app.use("/test", testRouter);

//db setup
app.get("/setup", async (req, res) => {
    try {
        await pool.query('CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(20), address VARCHAR(30))');
        res.status(200).send({message: "created db"});
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
        res.statusMessage("setup error");
    }
})
app.post("/", async (req, res) => {
    try {
        await pool.query('INSERT INTO users(david, praha) VALUES ($1, $2)', [name, location]);
        res.status(200).send({message: "added child"});
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
        res.statusMessage("insert error");
    }
})
app.get("/", async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM users');
        res.status(200).send({children: data.rows});
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
        res.statusMessage("select error");
    }
})
//all other routes
app.get("/*", (req, res) => {
    res.send("Unknown path!");
});

//port settings
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log(`Example app listening at http://localhost:${PORT}`);
});