import AuthContext, { useAuth } from "../context/AuthContext";
import Loading from "../components/loading";
import { Form, Button, Card } from "react-bootstrap";
import { useContext, useState } from "react";

function AddNewBankAccount() {
  const { fetchUserProfile } = useContext(AuthContext);
  const { user } = useAuth();
  const [newAccountType, setNewAccountType] = useState("checking");
  const [newAccountName, setNewAccountName] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  if (!user) {
    return <Loading />;
  }

  async function handleAddAccount(event) {
    event.preventDefault();

    try {
      const response = await fetch("/account/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          accountType: newAccountType,
          accountName: newAccountName,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedUser = await response.json();
      fetchUserProfile(token);
      setMessage("Account added successfully");
      setNewAccountName("");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error adding account");
      console.error("Error adding account:", error);
    }
  }

  return (
    <>
      <h1 className="mb-4">Add a New Bank Account</h1>
      <p>
        You can add a new bank account to your profile. Please provide the name
        and type of the account.
      </p>

      <Card>
        <Card.Body>
          <Form onSubmit={handleAddAccount}>
            <Form.Group controlId="accountName">
              <Form.Label>Account Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account name"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="accountType" className="mt-3">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                as="select"
                value={newAccountType}
                onChange={(e) => setNewAccountType(e.target.value)}
              >
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" className="mt-3" type="submit">
              Add Account
            </Button>
            {message && <p className="text-danger mt-3">{message}</p>}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default AddNewBankAccount;
