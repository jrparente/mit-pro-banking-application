import { createContext } from "react";

const UserContext = createContext({
  users: [
    {
      name: "John Doe",
      email: "john@doe.com",
      password: "password",
      balance: 100,
    },
  ],
});

export default UserContext;
