const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// id,name,salary,gender,team,address
const employeeSchema = new Schema(
  {
    // id: { type: Number, required: false },
    name: { type: String, required: true },
    salary: { type: Number, required: true },
    gender: { type: String, required: true },
    team: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
