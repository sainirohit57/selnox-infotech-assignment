import { Dropdown } from "react-bootstrap";
import { CiMenuKebab } from "react-icons/ci";
import { MdModeEdit, MdDelete, MdRemoveRedEye } from "react-icons/md";

const ActionDropdown = ({ employeeData, setEmployeeList, handleShow }) => {
  const handleDelete = (e) => {
    e.preventDefault();

    fetch(
      `${process.env.REACT_APP_DOMAIN}/delete-Employee/${employeeData.id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEmployeeList((prevData) =>
          prevData.filter((item) => item.id !== employeeData.id)
        );
      })
      .catch((error) => console.error(error));
  };
  return (
    <Dropdown className="action-dropdown">
      <Dropdown.Toggle
        id="action-dropdown"
        className="p-0 bg-transparent text-black border-0 dropdown-icon-disable"
      >
        <CiMenuKebab size={26} />
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0">
        <Dropdown.Item
          className="py-2 text-secondary fs-14 px-4 border-secondary-bottom bg-transparent"
          href="#"
          onClick={() => handleShow(employeeData, "view")}
        >
          <MdRemoveRedEye className="me-1" /> View
        </Dropdown.Item>
        <Dropdown.Item
          className="py-2 text-secondary fs-14 px-4 border-secondary-bottom bg-transparent"
          href="#"
          onClick={() => handleShow(employeeData, "edit")}
        >
          <MdModeEdit className="me-1" /> Edit
        </Dropdown.Item>
        <Dropdown.Item
          className="py-2 text-secondary fs-14 px-4 bg-transparent"
          href="#"
          onClick={handleDelete}
        >
          <MdDelete className="me-1" /> Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ActionDropdown;
