import axios from "axios";

export const productsIns = axios.create({
  baseURL: "http://localhost:3001",
});

