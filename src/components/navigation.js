import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  return (
    <>
      <Navbar expand="md" bg="light">
        <Container>
          <Link className="navbar-brand" to="/">
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
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/createaccount">
                Create Account
              </Link>
              <Link className="nav-link" to="/deposit">
                Deposit
              </Link>
              <Link className="nav-link" to="/withdraw">
                Withdraw
              </Link>
              <Link className="nav-link" to="/alldata">
                AllData
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
