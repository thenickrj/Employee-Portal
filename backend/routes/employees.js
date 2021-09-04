const router = require("express").Router();
let Employee = require("../models/employee.model");
// id,name,salary,gender,team,address

router.route("*/").get((req, res) => {
  Employee.find()
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("*/size").get((req, res) => {
  Employee.find()
    .then((employees) => res.json(employees.length))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/search/:val1").get((req, res) => {
  console.log(req.params.val1);
  let name = String(req.params.val1);
  Employee.find({ name: { $regex: name, $options: "i" } })
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/page=:id").get((req, res) => {
  Employee.find()
    .skip((parseInt(req.params.id) - 1) * 5)
    .limit(5)
    .then((employees) => {
      res.json(employees);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  // const id = Number(req.body.id);
  const name = req.body.name;
  const salary = Number(req.body.salary);
  const gender = req.body.gender;
  const team = req.body.team;
  const address = req.body.address;

  const newEmployee = new Employee({
    // id,
    name,
    salary,
    gender,
    team,
    address,
  });

  newEmployee
    .save()
    .then(() => res.json("Employee added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Employee.findById(req.params.id)
    .then((employee) => res.json(employee))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json("Employee deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Employee.findById(req.params.id)
    .then((employee) => {
      // employee.id = Number(req.body.id);
      employee.name = req.body.name;
      employee.salary = Number(req.body.salary);
      employee.gender = req.body.gender;
      employee.team = req.body.team;
      employee.address = req.body.address;

      employee
        .save()
        .then(() => res.json("Employee updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
