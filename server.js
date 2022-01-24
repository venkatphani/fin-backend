const express = require("express");
const helmet = require("helmet");
const db = require("./src/models");
const cors = require("cors");
const bodyParser = require("body-parser");
// setup app
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(bodyParser.json()); // middleware which parses body
app.use(cors(corsOptions)); // middleware to enables cors
app.use(helmet()); // middleware which adds http headers
require("dotenv").config({ path: ".env" }); //setup environment

db.sequelize.sync({ force: true }).then(() => {});
// bring all routes here
const routes = require("./src/routes");
const port = process.env.PORT || 2020;
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
