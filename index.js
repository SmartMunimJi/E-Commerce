const express = require("express");
const app = express();
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
const { jwtAuth} = require("./utils/jwtauth");


app.use(express.json());
app.use(jwtAuth);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

const port = 3000;
app.listen(port, "0.0.0.0", () => {
    console.log("server ready at port", port);
});

