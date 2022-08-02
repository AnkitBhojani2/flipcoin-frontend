// react
import React, { useEffect, useState } from "react";

// data
import config from "../config";

// components
import AddButton from "../components/AddButton";
import Navbar from "../components/Navbar";
import ShowBalance from "../components/ShowBalance";
import WithDrawButton from "../components/WithDrawButton";

// toastify
import { ToastContainer, toast } from "react-toastify";

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
  const [coin, setCoin] = useState(0);
  const [amount, setAmount] = useState(0.05);

  //public key and connection
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const accountAddress = String(publicKey);

  // user address and balance
  const [user, setUser] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    findAddress();
  }, [publicKey]);

  // find user
  const findAddress = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      walletAddress: accountAddress,
    });

    fetch(`${config.API}/api/auth/findAddress`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (
          result.error === "USER does not exists" &&
          publicKey !== null &&
          accountAddress !== null
        ) {
          return signUpUser();
        }

        signInUser();
      })
      .catch((error) => {
        console.log("Wallet is not connected");
      });
  };

  // sign in
  const signInUser = async () => {
    // if user found
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      walletAddress: accountAddress,
    });

    fetch(`${config.API}/api/auth/signin`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setBalance(result.user.walletBalance);
        setUser(result.user.walletAddress);
      })
      .catch((error) => console.log("error", error));
  };

  // sign up
  const signUpUser = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      walletAddress: accountAddress,
    });

    fetch(`${config.API}/api/auth/signup/`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setBalance(result.walletBalance);
        setUser(result.user.walletAddress);
      })
      .catch((error) => console.log("error", error));
  };

  // show result
  const showResult = () => {
    if (publicKey === null) {
      return toast.error("Please Connect Your Wallet", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }

    const randomNumber = Math.floor(Math.random() * 2);
    if (coin === randomNumber) {
      toast.success(`Congrats You win ${amount * 2} sol`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Sorry! Better Luck Next Time", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setCoin(0);
  };

  // send transaction
  const sendSol = () => {};

  return (
    <div>
      <Navbar findAddress={findAddress} />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4 text-center justify-between">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <ShowBalance user={user} balance={balance} />
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <AddButton />
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <WithDrawButton />
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center bg-slate-300">
        <section className="">
          <div className="text-center my-4">I Like</div>
          <div className="flex gap-3">
            <div
              className={`bg-yellow-400 w-[100px] h-[50px] flex items-center justify-center ${
                coin === 0 && " border-black border-2"
              } cursor-pointer`}
              onClick={() => {
                setCoin(0);
              }}
            >
              Head
            </div>

            <div
              className={`bg-yellow-400 w-[100px] h-[50px] flex items-center justify-center ${
                coin === 1 && "border-2 border-black"
              } cursor-pointer`}
              onClick={() => {
                setCoin(1);
              }}
            >
              Tail
            </div>
          </div>
        </section>

        <section className="">
          <div className="text-center my-4">For</div>
          <div className="grid grid-cols-3 gap-3">
            {/* 0.05 */}
            <div
              className={`bg-yellow-400 w-[300px] h-[50px] flex justify-center items-center ${
                amount === 0.05 && " border-black border-2"
              } cursor-pointer`}
              onClick={() => {
                setAmount(0.05);
              }}
            >
              0.05 sol
            </div>

            {/* 0.1 */}
            <div
              className={`bg-yellow-400 w-[300px] h-[50px] flex justify-center items-center ${
                amount === 0.1 && " border-black border-2"
              } cursor-pointer`}
              onClick={() => {
                setAmount(0.1);
              }}
            >
              0.1 sol
            </div>

            {/* 0.25 */}
            <div
              className={`bg-yellow-400 w-[300px] h-[50px] flex justify-center items-center ${
                amount === 0.25 && " border-black border-2"
              } cursor-pointer`}
              onClick={() => {
                setAmount(0.25);
              }}
            >
              0.25 sol
            </div>

            {/* 0.5  */}
            <div
              className={`bg-yellow-400 w-[300px] h-[50px] flex justify-center items-center ${
                amount === 0.5 && " border-black border-2"
              } cursor-pointer`}
              onClick={() => {
                setAmount(0.5);
              }}
            >
              0.5 sol
            </div>

            {/* 1  */}
            <div
              className={`bg-yellow-400 w-[300px]  h-[50px] flex justify-center items-center ${
                amount === 1 && " border-black border-2 "
              } cursor-pointer`}
              onClick={() => {
                setAmount(1);
              }}
            >
              1 sol
            </div>

            {/* 2  */}
            <div
              className={`bg-yellow-400 w-[300px] h-[50px] flex justify-center items-center ${
                amount === 2 && " border-black border-2"
              } cursor-pointer`}
              onClick={() => {
                setAmount(2);
              }}
            >
              2 sol
            </div>
          </div>
        </section>

        <div className="my-10">
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={showResult}
          >
            Double Or Nothing
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default HomePage;
