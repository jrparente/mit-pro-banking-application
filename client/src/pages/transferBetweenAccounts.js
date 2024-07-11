import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/utils";

function TransferBetweenAccounts() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [fromAccountId, setFromAccountId] = useState();
  const [toAccountId, setToAccountId] = useState();

  useEffect(() => {
    if (user && user.accounts.length >= 2) {
      setFromAccountId(user.accounts[0]?.accountId.toString() || "");
      setToAccountId(user.accounts[1]?.accountId.toString() || "");
    }
  }, [user]);

  function handleTransfer() {
    if (fromAccountId === toAccountId) {
      setStatus("Cannot transfer between the same account");
      return;
    }

    fetch("/account/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email: user.email,
        fromAccountId,
        toAccountId,
        amount: parseFloat(amount),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus("Transfer successful");
        setTimeout(() => {
          setAmount(0);
          setStatus("");
        }, 3000);
      })
      .catch((error) => {
        setStatus("Error performing transfer");
        console.error("Error performing transfer:", error);
      });
  }

  if (user && user.accounts.length < 2) {
    return (
      <div>
        <h1 className="mb-4">Transfer Between Accounts</h1>
        <p>You must have at least two accounts to transfer between accounts</p>
        <Button onClick={navigate("/addNewBankAccount")}>Create Account</Button>
      </div>
    );
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="mb-4">Transfer</h1>
      <p>Transfer money between your accounts.</p>

      <Card>
        <Card.Body>
          <Form className="d-flex flex-column gap-2">
            <Form.Group controlId="fromAccountId">
              <Form.Label>From Account</Form.Label>
              <Form.Control
                as="select"
                value={fromAccountId}
                onChange={(e) => setFromAccountId(e.target.value)}
              >
                {user.accounts.map((account) => (
                  <option key={account.accountId} value={account.accountId}>
                    {account.accountName} - {account.accountType} (Balance:{" "}
                    {formatCurrency(account.balance)})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="toAccountId">
              <Form.Label>To Account</Form.Label>
              <Form.Control
                as="select"
                value={toAccountId}
                onChange={(e) => setToAccountId(e.target.value)}
              >
                {user.accounts.map((account) => (
                  <option key={account.accountId} value={account.accountId}>
                    {account.accountName} - {account.accountType} (Balance:{" "}
                    {formatCurrency(account.balance)})
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleTransfer}>
              Submit
            </Button>
            {status && <p className="mt-3">{status}</p>}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default TransferBetweenAccounts;
