const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const prisma = require("./lib/prismaClient");
const indexRoute = require("./routes/index");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const gracefulShutdown = () => {
  prisma
    .$disconnect()
    .then(() => {
      console.log("Connection closed");
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

app.use("/api", indexRoute);

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

app.listen(process.env.PORT_NUM, () => {
  console.log("API online on port", process.env.PORT_NUM);
});
