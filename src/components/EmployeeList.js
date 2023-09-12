import { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import RegistrationForm from "./RegistrationForm";
import { Button } from "react-bootstrap";
import EmployeeDropdown from "./EmployeeDropdown";

const EmployeeList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeData, setEmployeeData] = useState({});
  const [mode, setMode] = useState("add");
  const [selectedEmployee, setSelectedEmployee] = useState([]);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = () => {
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_DOMAIN}/Get-Employee/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEmployeeList(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const handleShow = (data, mode) => {
    setMode(mode);
    setEmployeeData(data);
    setIsModal(true);
  };
  const handleClose = () => {
    setEmployeeData({});
    setIsModal(false);
  };

  if (isLoading) {
    return "Loading";
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="heading-1">Employee List</h2>
        <EmployeeDropdown
          employeeList={employeeList}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
        />
        <Button
          className="btn add-btn"
          type="button"
          onClick={() => handleShow({}, "add")}
        >
          Add Employee
        </Button>
      </div>
      {employeeList.length !== 0 && (
        <EmployeeTable
          employeeList={employeeList}
          setEmployeeList={setEmployeeList}
          handleShow={handleShow}
          selectedEmployee={selectedEmployee}
        />
      )}
      <RegistrationForm
        setEmployeeList={setEmployeeList}
        employeeData={employeeData}
        mode={mode}
        show={isModal}
        handleClose={handleClose}
      />
    </>
  );
};

export default EmployeeList;
