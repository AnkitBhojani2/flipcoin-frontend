const API = "http://localhost:3001";
// const API = process.env.REACT_APP_BACKEND;

export const config = {
  authenticateUser: `${API}/api/auth/authenticateUser`,
  addBalance: `${API}/api/transaction/addBalance`,
  widBalance: `${API}/api/transaction/widBalance`,
  doubleOrNothing: `${API}/api/transaction/doubleOrNothing`,
  SOL_RECIVER_ADDRESS: "DxFSUv3FDdvqWcxXeFiLbd6HYh2JPdkqaCNLyvqZ91DR",
};
