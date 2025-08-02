const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/product/download", express.static(path.join(__dirname, "uploads")));

const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const { jwtAuth } = require("./utils/jwtauth");


app.use(jwtAuth);

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

const port = 3000;
app.listen(port, "0.0.0.0", () => {
    console.log("server ready at port", port);
});
