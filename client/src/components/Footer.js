import { Container, Row, Col, Nav } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-light">
      <Container>
        <Row>
          <Col md={6}>
            <h5>About Bad Bank</h5>
            <small className="text-secondary">
              A full-stack banking application developed as part of the MIT
              Professional Certificate in Coding: Full Stack Development with
              MERN. It includes a React frontend and an Express/MongoDB backend,
              providing functionalities for user account management, deposits,
              and withdrawals.
            </small>
          </Col>
          <Col md={3}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <a
                href="https://github.com/jrparente/mit-pro-banking-application"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                GitHub Repository
              </a>
              <a
                href="https://joanaramosparente.pt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                Developer Page
              </a>
              <a
                href="https://www.render.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                Deployed on Render
              </a>
            </Nav>
          </Col>
          <Col md={3}>
            <h5>Contact</h5>
            <p>
              <a href="mailto:jrparente@gmail.com" className="text-light">
                Email Me
              </a>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <small className="text-secondary">
              &copy; {new Date().getFullYear()} Bad Bank. All Rights Reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
