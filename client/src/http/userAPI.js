import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, role) => {
  const { data } = await $host.post(
    "https://localhost:5000/api/user/registration",
    { email, password, role }
  );
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("https://localhost:5000/api/user/login", {
    email,
    password,
  });
  console.log(jwt_decode(data.token));
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("https://localhost:5000/api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
