// Load the config file.
require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const indexRouter = require("./routes/indexRouter");

const app = express();

// Setup middlewares.
app.use(express.json());
app.use(morgan("dev"));
app.use(expressLayouts);
app.use(express.static("public"));
app.use("/", indexRouter);

// Setup views.
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "layouts/layout");

// Setup mongoose.
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to mongoose."));

// Setup server.
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || "localhost";

app.listen(port, hostname, () => {
  console.log(`Server running on ${hostname}:${port}`);
});

console.log(process.env.DATABASE_URL);
