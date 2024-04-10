import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Form, Button, Card } from "react-bootstrap";

export default function Withdraw() {
  const context = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const [status, setStatus] = useState("");

  function handleWithdraw() {
    const user = context.users.find((user) => user.name === selectedUser);
    if (!user) {
      setStatus("User not found");
      return;
    }

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setStatus("Invalid amount");
      return;
    }

    if (amount > user.balance) {
      setStatus("Insufficient funds");
      return;
    }

    user.balance -= amount;

    setSelectedUser(null);
    setDepositAmount("");
    setStatus("Withdraw successful");
    setTimeout(() => setStatus(""), 3000);
  }

  return (
    <>
      <h1>Withdraw</h1>
      {/* Select user */}
      <Card className="mb-4">
        <Card.Header>
          <h5>Select User</h5>
        </Card.Header>
        <Card.Body>
          <Form.Group controlId="selectUser">
            <Form.Control
              as="select"
              onChange={(e) => setSelectedUser(e.target.value)}
              value={selectedUser || ""}
            >
              <option value="">-- Select User --</option>
              {context.users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Withdraw Amount */}
      {selectedUser && (
        <Card>
          <Card.Header>
            <h5>Withdraw Amount</h5>
          </Card.Header>
          <Card.Body className="d-flex flex-column gap-3">
            <h6>
              Balance for {selectedUser}: $
              {context.users.find((user) => user.name === selectedUser).balance}
            </h6>
            <Form className="d-flex flex-column gap-3">
              <Form.Group controlId="withdrawAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </Form.Group>

              {status && <small className="text-danger">{status}</small>}
              <Button variant="primary" onClick={handleWithdraw}>
                Withdraw
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      {/* Status */}
      {!selectedUser && status && (
        <Card className="mt-4">
          <Card.Header>
            <h5>Status</h5>
          </Card.Header>
          <Card.Body>
            <p>{status}</p>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
