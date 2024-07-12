import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Alert, Badge, Form, Spinner, Table } from "react-bootstrap";
import Loading from "../components/Loading";
import { formatCurrency } from "../utils/utils";

const getBadgeVariant = (type) => {
  switch (type) {
    case "Credit":
      return "success";
    case "Debit":
      return "danger";
    case "Transfer":
      return "info";
    default:
      return "secondary";
  }
};

function TransactionHistory() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`/account/transactions/${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [user]);

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.accountId === selectedAccountId
  );

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="mb-4">Transaction History</h1>
      <p>
        View your transaction history below. Select an account to view the list
        of transactions.
      </p>

      <Form className="mb-4">
        <Form.Group controlId="accountSelect">
          <Form.Label>Select Account</Form.Label>
          <Form.Control
            as="select"
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
          >
            <option value="">Select an account</option>
            {user.accounts.map((account) => (
              <option key={account.accountId} value={account.accountId}>
                {account.accountName} - {account.accountType}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">Error: {error}</Alert>
      ) : filteredTransactions.length === 0 ? (
        <Alert variant="info">
          No transactions found for the selected account.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Details</th>
              <th className="text-end">Amount</th>
              <th className="text-end">Balance After Transaction</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions &&
              filteredTransactions.length > 0 &&
              filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>
                    {transaction.transactionType ? (
                      <Badge bg={getBadgeVariant(transaction.transactionType)}>
                        {transaction.transactionType}
                      </Badge>
                    ) : (
                      " "
                    )}
                  </td>
                  <td>{new Date(transaction.date).toLocaleString()}</td>
                  <td>{transaction.details}</td>
                  <td className="text-end">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="text-end">
                    {formatCurrency(transaction.balanceAfterTransaction)}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default TransactionHistory;
