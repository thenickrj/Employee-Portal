import React from "react";
import "./addEmployees.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { store } from "react-notifications-component";
import "../notify-popup.css";
import { Link } from "react-router-dom";

function EditEmployees(props) {
  console.log(props.match.params.id);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [team, setTeam] = useState("");
  const [gender, setGender] = useState("");
  const [nameError, setNameError] = useState(false);
  const [salaryError, setSalaryError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [teamError, setTeamError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [data, setData] = useState([]);

  //   GEtting the details of the employee whose values are to be updated
  useEffect(() => {
    fetch(
      "https://quiet-reaches-98658.herokuapp.com/employees/" +
        props.match.params.id
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
        setName(data.name);
        setSalary(data.salary);
        setTeam(data.team);
        setAddress(data.address);
        setGender(data.gender);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   Notification Popup on completion of the task
  const notifyPopup = () => {
    store.addNotification({
      title: "Success!",
      message: "Employee Updated Successfully!",
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

  // Validating the data from the input fields, if correct will send the post request to the database
  function Validate() {
    if (name === "") {
      setNameError(true);
    } else if (name !== "") {
      setNameError(false);
    }
    if (salary === "") {
      setSalaryError(true);
    } else if (salary !== "") {
      setSalaryError(false);
    }
    if (address === "") {
      setAddressError(true);
    } else if (address !== "") {
      setAddressError(false);
    }
    if (team === "") {
      setTeamError(true);
    } else if (team !== "") {
      setTeamError(false);
    }
    if (gender === "") {
      setGenderError(true);
    } else if (gender !== "") {
      setGenderError(false);
    }

    if (
      !nameError &&
      !salaryError &&
      !genderError &&
      !teamError &&
      !addressError
    ) {
      const data = {
        name: name,
        salary: salary,
        gender: gender,
        team: team,
        address: address,
      };
      console.log(data);
      axios
        .post(
          "https://quiet-reaches-98658.herokuapp.com/employees/update/" +
            props.match.params.id,
          data
        )
        .then((res) => {
          console.log(res.data);
          notifyPopup();
        })
        .catch((err) => {
          console.log(err);
        });

      console.log("YAYAY");
    }
  }
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Add Employees!!!</h2>
      <div className="top_input">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <input
            className="name_input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter the Name Here"
          />
          <input
            className="salary_input"
            value={salary}
            onChange={(e) => {
              setSalary(Number(e.target.value));
            }}
            placeholder="Enter the Salary Here"
          />
        </div>
        <br />
        <input
          className="address_input"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="Enter the Address Here"
        />
        <br />
        <h5 style={{ marginLeft: "18%" }}>
          Select the team in which the Employee belongs
        </h5>
        <select
          className="team_input"
          value={team}
          onChange={(e) => {
            setTeam(e.target.value);
          }}
        >
          <option disabled selected value>
            {" "}
            -- Select an option --{" "}
          </option>

          <option value="Web Development">Web Development</option>
          <option value="Product">Product</option>
          <option value="Support">Support</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
        </select>
        <br />
        <h5 style={{ marginLeft: "18%" }}>Gender</h5>
        <div
          className="top_input"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <span style={{ marginLeft: "18%" }}>
            {" "}
            <input
              type="radio"
              value="Male"
              name="gender"
              checked={"Male" === gender}
            />{" "}
            Male
          </span>
          <span style={{ marginLeft: "18%" }}>
            <input
              type="radio"
              value="Female"
              name="gender"
              checked={"Female" === gender}
            />{" "}
            Female
          </span>
          <span style={{ marginLeft: "18%" }}>
            <input
              type="radio"
              value="Other"
              name="gender"
              checked={"Other" === gender}
            />{" "}
            Other
          </span>
          <button onClick={Validate} className="submit_button">
            Submit
          </button>
        </div>
        <br />
        {nameError === true && (
          <div className="alert alert-danger error_input" role="alert">
            <p>Please enter the name!</p>
          </div>
        )}
        {salaryError === true && (
          <div className="alert alert-danger error_input" role="alert">
            <p>Please enter the salary!</p>
          </div>
        )}
        {addressError === true && (
          <div className="alert alert-danger error_input" role="alert">
            <p>Please enter the address!</p>
          </div>
        )}
        {teamError === true && (
          <div className="alert alert-danger error_input" role="alert">
            <p>Please choose the team!</p>
          </div>
        )}
        {genderError === true && (
          <div className="alert alert-danger error_input" role="alert">
            <p>Please choose the gender!</p>
          </div>
        )}
      </div>
      <Link
        to="/"
        className="nav-link"
        style={{ textDecoration: "none", marginLeft: "18%" }}
      >
        ↩ Go to Homepage
      </Link>
    </div>
  );
}

export default EditEmployees;
