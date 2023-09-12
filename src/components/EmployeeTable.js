import { Table } from "react-bootstrap";
import ActionDropdown from "./ActionDropdown";

const EmployeeTable = ({
  employeeList,
  setEmployeeList,
  handleShow,
  selectedEmployee,
}) => {
  const filteredEmployee = employeeList.filter((employee) =>
    selectedEmployee.includes(employee.id.toString())
  );

  return (
    <div className="mt-4 table-border">
      <Table responsive className="text-center">
        <thead>
          <tr>
            <th className="w-20per">Name</th>
            <th className="w-15per">DOB</th>
            <th className="w-15per">Start Date</th>
            <th className="w-15per">End Date</th>
            <th className="w-30per">Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployee.map((employee) => {
            const {
              id,
              FirstName,
              LastName,
              DOB,
              StartDate,
              EndDate,
              Description,
            } = employee;
            return (
              <tr key={id}>
                <td>
                  {FirstName} {LastName}
                </td>
                <td>{DOB}</td>
                <td>{StartDate}</td>
                <td>{EndDate}</td>
                <td>{Description}</td>
                <td>
                  <ActionDropdown
                    employeeData={employee}
                    setEmployeeList={setEmployeeList}
                    handleShow={handleShow}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeTable;
