import axios from "axios";

export const productsIns = axios.create({
  baseURL: "https://vitalfitapi.onrender.com",
});

