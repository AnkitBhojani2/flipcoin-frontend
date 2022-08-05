// const API = process.env.API;
// const API = "https://flipcoin-backend-1.herokuapp.com";
const API = "http://localhost:8000";

export const config = {
  authenticateUser: `${API}/api/auth/authenticateUser`,
  addBalance: `${API}/api/transaction/addBalance`,
  widBalance: `${API}/api/transaction/widBalance`,
  doubleOrNothing: `${API}/api/transaction/doubleOrNothing`,
  SOL_RECIVER_ADDRESS: "DxFSUv3FDdvqWcxXeFiLbd6HYh2JPdkqaCNLyvqZ91DR",
};
