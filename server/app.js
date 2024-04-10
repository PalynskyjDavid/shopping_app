//modules
const express = require("express");

//const Router = rqeuire("./controller/-controller")
const productRouter = require("./controller/product-controller.js");
const cartRouter = rqeuire("./controller/cart-controller.js");
const userRouter = rqeuire("./controller/user-controller.js");
const categoryRouter = rqeuire("./controller/category-controller.js");

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

app.get("/*", (req, res) => {
    res.send("Unknown path!");
});

//port settings
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log(`Example app listening at http://localhost:${PORT}`);
});

//routes
app.use("/product", productRouter)