import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { store } from "react-notifications-component";

const Employee = (props) => (
  <tr>
    <td>{props.employee._id}</td>
    <td>{props.employee.name}</td>
    <td>{props.employee.gender}</td>
    <td>{props.employee.salary}</td>
    <td>{props.employee.team}</td>
    <td>{props.employee.address}</td>
    <td>
      <Link
        style={{ textDecoration: "none" }}
        to={"/edit/" + props.employee._id}
      >
        ✏ Edit
      </Link>{" "}
      |{" "}
      <a
        href="#"
        style={{ textDecoration: "none" }}
        onClick={() => {
          props.deleteEmployee(props.employee._id);
        }}
      >
        🗑 Delete
      </a>
    </td>
  </tr>
);

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchEmployees, setSearchEmployees] = useState([]);
  const [search, setSearch] = useState(false);

  //get the details of all the employees
  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   Notification Popup on completion of the task
  useEffect(() => {
    setSearchEmployees(
      employees.filter((employee) => {
        console.log(employee);
        return employee.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
    if (searchTerm !== "") {
      setSearch(true);
    } else if (searchTerm === "") {
      setSearch(false);
    }
    console.log(searchEmployees);
  }, [searchTerm]);
  const notifyDelete = () => {
    store.addNotification({
      title: "Success!",
      message: "Employee Deleted Successfully!",
      type: "success",
      background: "pink",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  };
  function deleteEmployee(id) {
    axios.delete("http://localhost:5000/employees/" + id).then((response) => {
      console.log(response.data);
      notifyDelete();
    });

    // this.setState({
    //   exercises: this.state.exercises.filter((el) => el._id !== id),
    // });
    setEmployees(employees.filter((el) => el._id !== id));
  }
  function employeeList() {
    return employees.map((employee) => {
      return (
        <Employee
          employee={employee}
          deleteEmployee={deleteEmployee}
          key={employee._id}
        />
      );
    });
  }
  function employeeSearchList() {
    return searchEmployees.map((employee) => {
      return (
        <Employee
          employee={employee}
          deleteEmployee={deleteEmployee}
          key={employee._id}
        />
      );
    });
  }
  return (
    <div>
      {/* {employees.map((employee)=>{<div>{console.log(employee)}
            <h1>{employee}</h1></div>})} */}
      <h1 style={{ textAlign: "center" }}>Employee Details</h1>
      <br />
      <input
        // className={style.searchPlace}
        style={{
          boxSizing: "border-box",
          // border: "3px solid #ccc",
          border: "none",
          webkitTransition: "0.5s",
          transition: "0.5s",
          outline: "none",
          fontFamily: "Poppins-Regular",
          fontSize: "20px",
        }}
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          // blogFilterChange(e);
        }}
        placeholder="🔍 Search"
      />
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Team</th>
            <th>Address</th>
          </tr>
        </thead>
        {!search && <tbody>{employeeList()}</tbody>}
        {search && searchEmployees.length > 0 && (
          <tbody>{employeeSearchList()}</tbody>
        )}
        {search && searchEmployees.length === 0 && (
          <h1 style={{ textAlign: "center" }}>
            No Employee Found with that name!!
          </h1>
        )}
      </table>
      {/* {employees.map((employee) => (
        <div>
          <div>{employee.name}</div>
          <div>{employee.gender}</div>
        </div>
      ))} */}
      <Link to="/add" className="nav-link" style={{ textDecoration: "none" }}>
        Add Employee!
      </Link>
    </div>
  );
}

export default Employees;
