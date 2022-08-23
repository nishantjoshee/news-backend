require("dotenv").config();
const http = require("http");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const categoryRouter = require("./routes/categoryRoute");
const newsRouter = require("./routes/newsRoute");
const tagRouter = require("./routes/tagRoute");
const clientRouter = require("./routes/clientRoute");
const newsTypeRouter = require("./routes/newsTypeRoute");
const userRouter = require("./routes/userRoute");
("use strict");
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/tag", tagRouter);
app.use("/api/v1/client", clientRouter);
app.use("/api/v1/newstype", newsTypeRouter);
app.use("/api/v1/user", userRouter);

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";
server.listen(PORT, HOST);
