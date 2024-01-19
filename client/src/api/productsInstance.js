import axios from "axios";

export const productsIns = axios.create({
  //baseURL: "https://vitalfitapi.onrender.com",
  baseURL: "http://localhost:3001",
});
// https://vitalfitapi.onrender.com
