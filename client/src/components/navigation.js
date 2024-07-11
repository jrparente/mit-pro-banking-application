import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

function Navigation() {
  const { user, logout } = useAuth();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props === undefined ? "" : props}
    </Tooltip>
  );

  return (
    <>
      <Navbar expand="md" bg="light">
        <Container>
          <NavLink className="navbar-brand" to="/">
            <div className="d-inline-flex align-items-center gap-1">
              <img
                src="/images/bank.png"
                width="25"
                height="25"
                className="d-inline-block align-top"
                alt=""
              ></img>
              <span>BadBank</span>
            </div>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!user && (
                <>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("Create a new account")}
                  >
                    <NavLink
                      className="btn btn-light create-account-link"
                      to="/createaccount"
                    >
                      Create Account
                    </NavLink>
                  </OverlayTrigger>{" "}
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("Login to your account")}
                  >
                    <NavLink
                      className="btn btn-light create-account-link"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </OverlayTrigger>
                </>
              )}
              {user && user.userRole === "client" && (
                <>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip(
                      "View profile and account information"
                    )}
                  >
                    <NavLink
                      className="btn btn-light create-account-link"
                      to="/dashboard"
                    >
                      <i class="bi bi-person"></i> Dashboard
                    </NavLink>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("A new new bank account")}
                  >
                    <NavLink className="btn btn-light" to="/addNewBankAccount">
                      <i class="bi bi-cash-stack"></i> Add Account
                    </NavLink>
                  </OverlayTrigger>{" "}
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("View transactions history")}
                  >
                    <NavLink className="btn btn-light" to="/transactions">
                      <i class="bi bi-arrow-left-right"></i> Transactions
                    </NavLink>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip("View balance and make a deposit")}
                  >
                    <NavLink className="btn btn-light" to="/deposit">
                      <i class="bi bi-arrow-down"></i> Deposit
                    </NavLink>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip(
                      "View balance and make a withdrawal"
                    )}
                  >
                    <NavLink className="btn btn-light" to="/withdraw">
                      <i class="bi bi-arrow-up"></i> Withdraw
                    </NavLink>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip(
                      "Transfer money between your accounts"
                    )}
                  >
                    <NavLink
                      className="btn btn-light"
                      to="/transferBetweenAccounts"
                    >
                      <i class="bi bi-arrow-down-up"></i> Transfer
                    </NavLink>
                  </OverlayTrigger>
                </>
              )}
              {user && user.userRole === "employee" && (
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("View all data stored in the bank")}
                >
                  <NavLink className="btn btn-light" to="/alldata">
                    <i class="bi bi-database"></i> All Data
                  </NavLink>
                </OverlayTrigger>
              )}
            </Nav>
          </Navbar.Collapse>
          <div className="d-none d-lg-inline-flex gap-2">
            {!user && (
              <>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("Create a new account")}
                >
                  <NavLink className="btn btn-primary" to="/createaccount">
                    Create Account
                  </NavLink>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("Login to your account")}
                >
                  <NavLink className="btn btn-secondary" to="/login">
                    Login
                  </NavLink>
                </OverlayTrigger>
              </>
            )}
            {user && (
              <>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip(
                    "See your profile and manage your account"
                  )}
                >
                  <NavLink className="btn btn-primary" to="/dashboard">
                    <i class="bi bi-person"></i> Dashboard
                  </NavLink>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("Logout of your account")}
                >
                  <Button className="btn btn-secondary" onClick={logout}>
                    <i class="bi bi-box-arrow-right"></i> Logout
                  </Button>
                </OverlayTrigger>
              </>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
