require('dotenv-safe').config();
require("express-async-errors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3333;
const { createLog } = require("./logger");

// working route
app.get("/teste1", (req, res, next) => {
  res.sendStatus(200);
});

// route with error, but was caught
app.get("/teste2", (req, res, next) => {
  try {
    throw new Error("Erro de teste 2");
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// error not caught
app.get("/teste3", async (req, res, next) => {
  throw new Error("Teste 3 deu erro");
});

// error handler
app.use( async (error, req, res, next) => {
  console.log("Erro middleware");

  await createLog(error.message);

  // render the error page
  res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log("Server is running!");
});