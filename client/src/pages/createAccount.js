import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BankForm from "../components/BankForm";
import { useAuth } from "../context/AuthContext";

export default function CreateAccount() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  async function handleCreateAccount(data) {
    try {
      const response = await fetch("/account/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("Account created successfully!");
      } else {
        const result = await response.text();
        setStatus(`Error: ${result}`);
      }
    } catch (error) {
      setStatus("Error creating account. Please try again.");
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="mb-4">Create Account</h1>
      <p>Fill in the information below to create an account.</p>

      <BankForm
        bgcolor=""
        txtcolor="black"
        label="Register"
        handleClick={handleCreateAccount}
        hideAmount={true}
        successButton="Add another account"
        isLoginForm={false}
        statusFromRequest={status}
      />
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </>
  );
}
