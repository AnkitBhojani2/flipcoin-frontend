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
  // set user and balance
  const [user, setUser] = useState("");
  const [balance, setBalance] = useState("");

  //public key and connection
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const walletAddress = String(publicKey);

  useEffect(() => {
    if (walletAddress !== null) {
      validateUser();
    }
  }, [publicKey]);

  const validateUser = async () => {
    if (walletAddress === null) {
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        walletAddress: walletAddress,
      });

      fetch(config.authenticateUser, {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.user.walletAddress !== null) {
            setUser(result.user.walletAddress);
            setBalance(result.user.walletBalance);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  // user address and balance
  // const [user, setUser] = useState("");
  // const [balance, setBalance] = useState(0);

  return (
    <div>
      <Navbar />

      <Main user={user} balance={balance} validateUser={validateUser} />

      <PlayArea validateUser={validateUser} />

      <ToastContainer />
    </div>
  );
};

export default HomePage;
