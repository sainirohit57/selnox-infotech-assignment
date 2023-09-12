import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const RegistrationForm = ({
  show,
  handleClose,
  setEmployeeList,
  employeeData,
  mode,
}) => {
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData(employeeData);
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      FirstName: e.target["FirstName"].value,
      LastName: e.target["LastName"].value,
      DOB: e.target["DOB"].value,
      CurrentSalary: e.target["CurrentSalary"].value,
      Study: e.target["Study"].value,
      StartDate: e.target["StartDate"].value,
      EndDate: e.target["EndDate"].value,
      Description: e.target["Description"].value,
    };

    if (mode === "add") {
      fetch(`${process.env.REACT_APP_DOMAIN}/Add-Employee/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setEmployeeList((prevData) => [data.data, ...prevData]);
        })
        .catch((error) => console.error(error))
        .finally(() => handleClose());
    } else if (mode === "edit") {
      fetch(
        `${process.env.REACT_APP_DOMAIN}/update-Employee/${employeeData.id}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formData),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setEmployeeList((prevData) =>
            prevData.map((item) => {
              if (item.id === employeeData.id) {
                return data.data;
              }
              return item;
            })
          );
        })
        .catch((error) => console.error(error))
        .finally(() => handleClose());
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header className="justify-content-center border-0">
            <Modal.Title className="heading-1">
              Employee Registration Form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="row p-5">
            <Form.Group className="mb-4 col-lg-6" controlId="FirstName">
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                type="text"
                name="FirstName"
                placeholder="Enter your name"
                defaultValue={formData?.FirstName || ""}
                onChange={handleChange}
                readOnly={mode === "view"}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4 col-lg-6" controlId="LastName">
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                type="text"
                name="LastName"
                placeholder="Enter your name"
                defaultValue={formData?.LastName || ""}
                onChange={handleChange}
                readOnly={mode === "view"}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4 col-12" controlId="DOB">
              <Form.Label>DOB*</Form.Label>
              <Form.Control
                type="date"
                name="DOB"
                defaultValue={formData?.DOB || ""}
                onChange={handleChange}
                readOnly={mode === "view"}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4 col-12" controlId="Study">
              <Form.Label>Study*</Form.Label>
              <Form.Select
                required
                name="Study"
                value={formData?.Study || ""}
                onChange={handleChange}
                disabled={mode === "view"}
              >
                <option value="BE">B.E</option>
                <option value="BSc">BSc</option>
                <option value="BCA">BCA</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4 col-lg-6" controlId="StartDate">
              <Form.Label>Start Date*</Form.Label>
              <Form.Control
                type="date"
                name="StartDate"
                defaultValue={formData?.StartDate || ""}
                onChange={handleChange}
                readOnly={mode === "view"}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4 col-lg-6" controlId="EndDate">
              <Form.Label>End Date*</Form.Label>
              <Form.Control
                type="date"
                name="EndDate"
                defaultValue={formData?.EndDate || ""}
                onChange={handleChange}
                readOnly={mode === "view"}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4 col-12" controlId="CurrentSalary">
              <Form.Label>Current Salary*</Form.Label>
              <Form.Control
                type="number"
                name="CurrentSalary"
                placeholder="30000"
                defaultValue={formData?.CurrentSalary || ""}
                onChange={handleChange}
                readOnly={mode === "view"}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>Description*</Form.Label>
              <Form.Control
                as="textarea"
                name="Description"
                rows={3}
                defaultValue={formData?.Description || ""}
                onChange={handleChange}
                readOnly={mode === "view"}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="justify-content-between p-5 pt-0 border-0">
            <Button className="btn cancel-btn" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className="btn save-btn"
              type="submit"
              disabled={mode === "view"}
            >
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default RegistrationForm;
