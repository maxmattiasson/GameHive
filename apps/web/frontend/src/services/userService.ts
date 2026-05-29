import { API_BASE_URL } from "../config/api";

const deleteUser = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  return response;
};
export default deleteUser;
