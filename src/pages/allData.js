import { useContext } from "react";
import UserContext from "../context/UserContext";
import CustomCard from "../components/CustomCard";

export default function AllData() {
  const context = useContext(UserContext);

  return (
    <>
      <h5>All Data in Store</h5>
      <div className="row">
        {context.users.map((user) => (
          <div key={user.id} className="col-md-5 col-lg-4 mb-4">
            <CustomCard
              header={user.name}
              txtcolor="dark"
              body={
                <div>
                  <strong>Email:</strong> {user.email}
                  <br />
                  <strong>Balance:</strong> ${user.balance}
                </div>
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}
