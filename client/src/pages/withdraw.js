import { useState, useContext, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import AuthContext, { useAuth } from "../context/AuthContext";
import Loading from "../components/loading";
import { formatCurrency } from "../utils/utils";

export default function Withdraw() {
  const { user } = useAuth();
  const { fetchUserProfile } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState(0);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    if (user) {
      setSelectedAccountId(user.accounts[0].accountId);
      setBalance(user.accounts[0].balance);
    }
  }, [user]);

  useEffect(() => {
    if (selectedAccountId && user) {
      const selectedAccount = user.accounts.find(
        (account) => account.accountId === selectedAccountId
      );
      if (selectedAccount) {
        setBalance(selectedAccount.balance);
      }
    }
  }, [selectedAccountId, user]);

  async function handleWithdraw() {
    if (!user) {
      setStatus("User not found");
      return;
    }

    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setStatus("Invalid amount");
      return;
    }

    console.log(`Withdraw amount: ${amount} and balance: ${balance}`);
    if (amount > balance) {
      setStatus("Insufficient funds");
      return;
    }

    // Update the user's balance on the backend
    try {
      const response = await fetch("/account/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.email,
          accountId: selectedAccountId,
          amount: -amount,
          transactionType: "Debit",
          details,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Result of withdraw:", result);
      setStatus("Withdraw successful");
      setWithdrawAmount("");
      setDetails("");
      fetchUserProfile(token);
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("Withdraw failed");
      console.error("Error updating balance:", error);
    }
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="mb-4">Withdraw</h1>
      <p>
        Withdraw money from your account. Select an account and enter the
        amount.
      </p>

      <Card>
        <Card.Body>
          <Form className="d-flex flex-column gap-2">
            <Form.Group controlId="accountId">
              <Form.Label>Select Account</Form.Label>
              <Form.Control
                as="select"
                value={selectedAccountId}
                onChange={(e) => setSelectedAccountId(e.target.value)}
              >
                {user.accounts.map((account) => (
                  <option key={account.accountId} value={account.accountId}>
                    {account.accountName} - {account.accountType}
                  </option>
                ))}
              </Form.Control>
              <p>
                <small>Balance: {formatCurrency(balance)}</small>
              </p>
            </Form.Group>
            <Form.Group controlId="withdrawAmount">
              <Form.Label>Withdraw Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="details">
              <Form.Label>Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </Form.Group>
            {status && (
              <p>
                <small className="text-danger">{status}</small>
              </p>
            )}
            <Button
              variant="primary"
              onClick={handleWithdraw}
              disabled={!withdrawAmount}
              className="mt-2"
            >
              Withdraw
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
