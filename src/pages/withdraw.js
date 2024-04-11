import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Form, Button } from "react-bootstrap";
import CustomCard from "../components/CustomCard";

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
      <CustomCard
        header="Select User"
        txtcolor="dark"
        body={
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
        }
      />

      {/* Withdraw Amount */}
      {selectedUser && (
        <CustomCard
          header="Withdraw"
          txtcolor="dark"
          body={
            <div>
              <h6>
                Balance for {selectedUser}: $
                {
                  context.users.find((user) => user.name === selectedUser)
                    .balance
                }
              </h6>
              <Form className="d-flex flex-column gap-3">
                <Form.Group controlId="withdrawAmount">
                  <Form.Label>Withdraw Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </Form.Group>
                {status && <small className="text-danger">{status}</small>}
                <Button variant="primary" onClick={handleWithdraw}>
                  Withdraw
                </Button>
              </Form>
            </div>
          }
        />
      )}

      {/* Status */}
      {!selectedUser && status && (
        <CustomCard header="Status" txtcolor="dark" body={<p>{status}</p>} />
      )}
    </>
  );
}
