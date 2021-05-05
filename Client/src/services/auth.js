const axios = require("axios");

const baseUrl = "http://localhost:3000";

export async function loginService() {
  const response = await axios.post(`${baseUrl}/auth/login`);
  return response;
}
