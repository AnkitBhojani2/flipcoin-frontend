import React, { useEffect, useState } from "react";
import config from "../config";
import AddButton from "../components/AddButton";
import Navbar from "../components/Navbar";
import ShowBalance from "../components/ShowBalance";
import WithDrawButton from "../components/WithDrawButton";
import { ToastContainer, toast } from "react-toastify";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const axios = require("axios");

const HomePage = () => {
  const [coin, setCoin] = useState(0);
  const { publicKey } = useWallet();

  const accountAddress = String(publicKey);

  const [user, setUser] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    findAddress();
  }, [publicKey]);

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
          publicKey !== undefined
        ) {
          return signUpUser();
        }

        signInUser();
      })
      .catch((error) => {
        console.log("Wallet is not connected");
      });
  };

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
    if (coin === 0) {
      toast.error("Select Head or Tail First", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const randomNumber = Math.floor(Math.random() * 2) + 1;
      if (coin === randomNumber) {
        toast.success("Congrats You win this game", {
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
    }
  };

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

      <div className="p-7 bg-slate-300">
        <section className="text-gray-600 body-font">
          <div className="container px-5  mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 md:w-1/6 sm:w-1/3 w-full">
                <div
                  className={`bg-yellow-400 py-3 ${
                    coin === 1 && "border border-black"
                  } cursor-pointer`}
                  onClick={() => {
                    setCoin(1);
                  }}
                >
                  Head
                </div>
              </div>
              <div className="p-4 md:w-1/6 sm:w-1/3 w-full">
                <div
                  className={`bg-yellow-400 py-3 ${
                    coin === 2 && "border border-black"
                  } cursor-pointer`}
                  onClick={() => {
                    setCoin(2);
                  }}
                >
                  Tail
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 ml-24">
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
