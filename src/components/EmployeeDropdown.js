import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

const EmployeeDropdown = ({
  employeeList,
  selectedEmployee,
  setSelectedEmployee,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let newArray = [];
    employeeList.forEach((employee) => {
      newArray.push(employee.id.toString());
    });
    setSelectedEmployee(newArray);
  }, [employeeList]);

  const toggleEmployeeSelect = (e) => {
    let newArray = [];
    const checkboxId = e.target.value;

    if (e.target.value === "all") {
      if (e.target.checked) {
        employeeList.forEach((employee) => {
          newArray.push(employee.id.toString());
        });
        setSelectedEmployee(newArray);
      } else {
        newArray = [];
        setSelectedEmployee(newArray);
      }
    } else {
      if (e.target.checked) {
        setSelectedEmployee([...selectedEmployee, checkboxId]);
      } else {
        const updatedArray = selectedEmployee.filter((id) => id !== checkboxId);
        setSelectedEmployee(updatedArray);
      }
    }
  };

  const filteredEmployee = employeeList.filter((employee) =>
    employee.FirstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dropdown className="search-dropdown">
      <Dropdown.Toggle
        className="form-select w-100 text-start fw-500"
        id="search-dropdown-btn"
      >
        Select employee
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-1">
        <Form.Group controlId="search">
          <Form.Control
            type="search"
            placeholder="Search employee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <div className="px-3 border-tertiary-bottom">
          <Form.Check
            type="checkbox"
            label="All employee"
            value="all"
            className="py-2"
            onChange={toggleEmployeeSelect}
            checked={employeeList?.length === selectedEmployee?.length}
          />
        </div>
        <div
          className="px-3 overflow-auto custom-scrollbar"
          style={{ maxHeight: "260px" }}
        >
          {filteredEmployee.map((employee) => (
            <Form.Check
              key={employee.id}
              value={employee.id}
              type="checkbox"
              className="py-1"
              label={`${employee?.FirstName} ${employee?.LastName}`}
              checked={selectedEmployee.includes(employee.id.toString())}
              onChange={toggleEmployeeSelect}
            />
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default EmployeeDropdown;
