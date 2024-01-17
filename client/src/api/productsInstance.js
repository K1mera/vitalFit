import axios from "axios";

export const productsIns = axios.create({
  baseURL: "https://localhost:3001",
});
