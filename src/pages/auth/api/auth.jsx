import axios from "axios";

export const loginUser = async (data) => {
  const response = await axios.post("http://localhost:3000/api/users/login", data);
  return response.data;
};
