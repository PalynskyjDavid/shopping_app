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

//
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

//all other routes
app.get("/*", (req, res) => {
    res.send("Unknown path!");
});

//port settings
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log(`Example app listening at http://localhost:${PORT}`);
});