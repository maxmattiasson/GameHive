import { useState } from "react";
import Button from "../../components/ui/Button";
import type { User } from "../../types/user";

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");

  const findUsers = async (id: string) => {
    try {
      const response = await fetch(
        `/api/users?search=${encodeURIComponent(filter)}`,
        {
          credentials: "include"
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      // hantera fel
    }
  };
  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (response.ok) {
        setUsers((user) => users.filter((user) => user._id !== id));
      }
    } catch (error) {
      // hantera fel
    }
  };

  return (
    <div>
      <h1>ADMIN</h1>

      <fieldset>
        <legend>Delete user</legend>
      </fieldset>
    </div>
  );
};

export default AdminPage;
