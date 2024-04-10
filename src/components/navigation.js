import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
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
              <NavLink className="nav-link" to="/createaccount">
                Create Account
              </NavLink>
              <NavLink className="nav-link" to="/deposit">
                Deposit
              </NavLink>
              <NavLink className="nav-link" to="/withdraw">
                Withdraw
              </NavLink>
              <NavLink className="nav-link" to="/alldata">
                AllData
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
