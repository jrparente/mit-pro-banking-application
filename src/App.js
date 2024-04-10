import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AllData from "./pages/allData";
import Home from "./pages/home";
import CreateAccount from "./pages/createAccount";
import Deposit from "./pages/deposit";
import Withdraw from "./pages/withdraw";
import Navigation from "./components/navigation";

function App() {
  return (
    <Router>
      <Navigation />
      <Container className="mt-5 mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/alldata" element={<AllData />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
