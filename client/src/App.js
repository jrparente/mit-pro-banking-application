import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import AllData from "./pages/allData";
import Home from "./pages/home";
import CreateAccount from "./pages/createAccount";
import Login from "./pages/login";
import Deposit from "./pages/deposit";
import Withdraw from "./pages/withdraw";
import Navigation from "./components/navigation";
import Dashboard from "./pages/dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import TransactionHistory from "./pages/transactionHistory";
import AddNewBankAccount from "./pages/addNewBankAccount";
import TransferBetweenAccounts from "./pages/transferBetweenAccounts";
import Footer from "./components/Footer";

function RequireAuth({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container-flex">
          <Navigation />
          <Container className="mt-5 mb-5 flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createaccount" element={<CreateAccount />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/addNewBankAccount"
                element={
                  <RequireAuth>
                    <AddNewBankAccount />
                  </RequireAuth>
                }
              />
              <Route
                path="/transactions"
                element={
                  <RequireAuth>
                    <TransactionHistory />
                  </RequireAuth>
                }
              />

              <Route
                path="/deposit"
                element={
                  <RequireAuth>
                    <Deposit />
                  </RequireAuth>
                }
              />
              <Route
                path="/withdraw"
                element={
                  <RequireAuth>
                    <Withdraw />
                  </RequireAuth>
                }
              />
              <Route
                path="/transferBetweenAccounts"
                element={
                  <RequireAuth>
                    <TransferBetweenAccounts />
                  </RequireAuth>
                }
              />
              <Route
                path="/alldata"
                element={
                  <RequireAuth>
                    <AllData />
                  </RequireAuth>
                }
              />
            </Routes>
          </Container>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
