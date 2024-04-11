import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
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
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip("Create a new account")}
              >
                <NavLink
                  className="nav-link create-account-link"
                  to="/createaccount"
                >
                  Create Account
                </NavLink>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip("View balance and make a deposit")}
              >
                <NavLink className="nav-link" to="/deposit">
                  Deposit
                </NavLink>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip("View balance and make a withdrawal")}
              >
                <NavLink className="nav-link" to="/withdraw">
                  Withdraw
                </NavLink>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip("View all data stored in the bank")}
              >
                <NavLink className="nav-link" to="/alldata">
                  All Data
                </NavLink>
              </OverlayTrigger>
            </Nav>
          </Navbar.Collapse>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Create a new account")}
          >
            <NavLink
              className="btn btn-primary create-account-btn"
              to="/createaccount"
            >
              Create Account
            </NavLink>
          </OverlayTrigger>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
