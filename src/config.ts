// const API = process.env.API;
const API = "https://flipcoin-backend-1.herokuapp.com";

export const config = {
  authenticateUser: `${API}/api/auth/authenticateUser`,
  addBalance: `${API}/api/transaction/addBalance`,
  widBalance: `${API}/api/transaction/widBalance`,
  SOL_RECIVER_ADDRESS: "DxFSUv3FDdvqWcxXeFiLbd6HYh2JPdkqaCNLyvqZ91DR",
};
