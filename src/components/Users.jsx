import React from "react";
import axios from "axios";
import User from "./User";
import "../styles/user-card.css";

function Users() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => response.data)
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <div className="content">
        <h1>Number of current users: {users.length}</h1>
      </div>

      <div className="flex-card">
        {users.map((user, i) => {
          return (
            <div className="cards-user">
              <User user={user} key={i} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Users;
