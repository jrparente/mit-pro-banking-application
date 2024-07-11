import { useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function BankForm({
  bgcolor,
  txtcolor,
  label,
  successButton,
  handleClick,
  isLoginForm,
  statusFromRequest,
}) {
  const initialState = {
    name: "",
    email: "",
    password: "",
    userRole: "client",
    validated: false,
    status: statusFromRequest,
    show: true,
  };

  const [formData, setFormData] = useState(initialState);

  const { name, email, password, userRole, validated, show } = formData;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormData((prevState) => ({
      ...prevState,
      validated: isLoginForm
        ? prevState.email !== "" && prevState.password.length >= 8
        : prevState.name !== "" &&
          prevState.email !== "" &&
          prevState.password.length >= 8,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleClick({ name, email, userRole, password });
    setFormData({ ...formData, show: false });
  }

  function clearForm() {
    setFormData(initialState);
  }

  const renderForm = () => (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {!isLoginForm && (
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
            name="name"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a name.
          </Form.Control.Feedback>
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
          name="email"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
          name="password"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a password.
        </Form.Control.Feedback>
      </Form.Group>

      {!isLoginForm && (
        <Form.Group className="mb-3" controlId="formBasicType">
          <Form.Label>User Role</Form.Label>
          <Form.Select
            required
            aria-label="Select User Role"
            name="userRole"
            onChange={handleChange}
          >
            <option value="client">Client</option>
            <option value="employee">Employee</option>
          </Form.Select>
        </Form.Group>
      )}

      <Button type="submit" variant="primary" disabled={!validated}>
        {label}
      </Button>
    </Form>
  );

  return (
    <Card className={`bg-${bgcolor} text-${txtcolor} mb-4`}>
      <Card.Header>{label}</Card.Header>
      <Card.Body>
        {show
          ? renderForm()
          : !isLoginForm && (
              <Button type="submit" variant="primary" onClick={clearForm}>
                {successButton}
              </Button>
            )}
      </Card.Body>
      {statusFromRequest && (
        <Card.Footer className="text-muted">{statusFromRequest}</Card.Footer>
      )}
    </Card>
  );
}
