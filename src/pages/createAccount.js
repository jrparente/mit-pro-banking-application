import { useContext } from "react";
import BankForm from "../components/BankForm";
import UserContext from "../context/UserContext";

export default function CreateAccount() {
  const context = useContext(UserContext);

  function handleCreateAccount(data) {
    context.users.push({
      name: data.name,
      email: data.email,
      password: data.password,
      balance: 100,
    });

    return true;
  }

  return (
    <BankForm
      bgcolor=""
      txtcolor="black"
      label="Create Account"
      handleCreateAccount={handleCreateAccount}
      hideAmount={true}
      successButton="Add another account"
    />
  );
}
