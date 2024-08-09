import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import AuthContext, { useAuth } from "../context/AuthContext";
import { ButtonGroup, Card, Col, Dropdown, Row, Table } from "react-bootstrap";
import Loading from "../components/Loading";
import { formatCurrency } from "../utils/utils";

function Dashboard() {
  const { fetchUserProfile } = useContext(AuthContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user && user.userRole === "client") {
      setAccounts(user.accounts || []);

      const total = user.accounts.reduce((acc, account) => {
        return acc + account.balance;
      }, 0);
      setTotalBalance(total);
    }
  }, [user]);

  function handleDelete(email) {
    if (
      window.confirm(
        `Are you sure you want to delete the user with email: ${email}?`
      )
    ) {
      try {
        fetch(`/account/delete/${email}`, {
          method: "DELETE",
        });
        setMessage(
          "User deleted successfully, you will be redirected to the home page shortly."
        );
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        setMessage("Error deleting user");
        console.error("Error deleting user:", error);
      }
    }
  }

  async function handleDeleteAccount(accountId) {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        const response = await fetch("/account/deleteAccount", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: user.email,
            accountId: accountId,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        fetchUserProfile(token);
        setMessage("Account deleted successfully");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Error deleting account");
        console.error("Error deleting account:", error);
      }
    }
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <div className="mb-4">
        <h5 className="text-secondary">Welcome,</h5>
        <h1>{user.name}</h1>
      </div>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="d-flex justify-start gap-1">
              <i class="bi bi-person-circle"></i>
              <strong>User Profile</strong>
            </Card.Header>
            <Card.Body className="d-flex flex-column justify-content-center">
              <span>
                <strong>Name:</strong> {user.name}
              </span>
              <span>
                <strong>Email:</strong> {user.email}
              </span>
              <span>
                <strong>User Role:</strong> {user.userRole}
              </span>
            </Card.Body>
          </Card>
        </Col>
        {user.userRole === "client" && (
          <Col md={6}>
            <Card className="h-100 d-flex flex-column justify-content-center">
              <Card.Header className="bg-dark text-white d-flex justify-content-center align-items-center gap-1">
                <i class="bi bi-wallet"></i>
                <strong>Balance</strong>
              </Card.Header>
              <Card.Body className="d-flex justify-content-center align-items-center">
                <h3 className="display-4">{formatCurrency(totalBalance)}</h3>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {user.userRole === "client" && (
        <Row className="mb-4">
          <Col>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Account Name </th>
                  <th className="text-center">Account Type</th>
                  <th className="text-end">Balance</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.accountId}>
                    <td>
                      <Dropdown as={ButtonGroup}>
                        <Button variant="light" size="sm">
                          {account.accountName}
                        </Button>
                        <Dropdown.Toggle
                          variant="light"
                          id="dropdown-split-basic"
                          size="sm"
                        />

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              handleDeleteAccount(account.accountId)
                            }
                          >
                            Delete Account
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td className="text-center">{account.accountType}</td>
                    <td className="text-end">
                      {formatCurrency(account.balance)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2">
                    <strong>Total Balance</strong>
                  </td>
                  <td className="text-end">
                    <strong>{formatCurrency(totalBalance)}</strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      {message && <p className="text-danger">{message}</p>}

      <Row className="mb-4">
        <Col>
          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(user.email)}
              disabled={
                user.email === "miranda@badbank.com" ||
                user.email === "harry@mail.com"
              }
            >
              Delete User
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
