import { useState } from "react";
import CustomCard from "./CustomCard";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function BankForm({
  bgcolor,
  txtcolor,
  label,
  successButton,
  handleCreateAccount,
}) {
  const initialState = {
    name: "",
    email: "",
    password: "",
    validated: false,
    status: "",
    show: true,
  };

  const [formData, setFormData] = useState(initialState);

  const { name, email, password, validated, status, show } = formData;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormData((prevState) => ({
      ...prevState,
      validated:
        prevState.name !== "" &&
        prevState.email !== "" &&
        prevState.password.length >= 8,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleCreateAccount({ name, email, password });
    setFormData({ ...formData, status: "Account created", show: false });
  }

  function clearForm() {
    setFormData(initialState);
  }

  const renderForm = () => (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
      <Button type="submit" variant="primary" disabled={!validated}>
        {label}
      </Button>
    </Form>
  );

  return (
    <CustomCard
      bgcolor={bgcolor}
      txtcolor={txtcolor}
      header={label}
      status={status}
      body={
        show ? (
          renderForm()
        ) : (
          <Button type="submit" variant="primary" onClick={clearForm}>
            {successButton}
          </Button>
        )
      }
    />
  );
}
