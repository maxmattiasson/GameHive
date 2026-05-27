import { useState } from "react";
import Button from "../../components/ui/Button";

const AdminPage = () => {
  const [users, setUsers] = useState("");

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      if (response.ok) {
        // ta bort användare och uppdatera state
      } else {
        //hantera fel
      }
    } catch (error) {
      // hantera fel
    }
  };

  return (
    <div>
      <h1>ADMIN</h1>
      <form action="">
        <fieldset>
          <legend>Delete user</legend>
          <input placeholder="User Id" />

          <Button type="submit" color="primary">
            Delete
          </Button>
        </fieldset>
      </form>
    </div>
  );
};

export default AdminPage;
