const express = require("express");
const cors = require("cors");
const { getEmployeeById, getAllEmployees } = require("./controllers");
const app = express();
app.use(express.json());
app.use(cors());

//Exercise 1: Retrieve All Employees

app.get("/employees", async (req, res) => {
  const employees = getAllEmployees();
  res.json({ employees });
});

//Exercise 2: Retrieve Employee by ID

app.get("/employees/details/:id", async (req, res) => {
  let employee = getEmployeeById(parseInt(req.params.id));
  res.json(employee);
});

module.exports = {
  app,
};
