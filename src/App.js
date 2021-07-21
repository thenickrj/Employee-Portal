import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Employees from "./components/Employees";
import "bootstrap/dist/css/bootstrap.min.css";
import EditEmployees from "./components/EditEmployees";
import AddEmployees from "./components/AddEmployees";
import ReactNotification from "react-notifications-component";

function App() {
  return (
    <div className="container">
      <ReactNotification />
      <Router>
        <Route path="/" exact component={Employees} />
        <Route path="/edit/:id" exact component={EditEmployees} />
        <Route path="/add" exact component={AddEmployees} />
      </Router>
      {/* <Employees /> */}
    </div>
  );
}

export default App;
