// react
import React, { useEffect, useState } from "react";

// data
import { config } from "../config";

// components
import Navbar from "../components/MainComponents/Navbar";
import Main from "../components/MainComponents/Main";
import PlayArea from "../components/MainComponents/PlayArea";

// toastify
import { ToastContainer } from "react-toastify";

// web3
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  Transaction,
  PublicKey,
  SystemProgram,
  Keypair,
} from "@solana/web3.js";

// axios
const axios = require("axios");

const HomePage = () => {
  // set Coin and Amount

  //public key and connection
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const accountAddress = String(publicKey);

  // user address and balance
  // const [user, setUser] = useState("");
  // const [balance, setBalance] = useState(0);

  return (
    <div>
      <Navbar />

      <Main />

      <PlayArea />

      <ToastContainer />
    </div>
  );
};

export default HomePage;
