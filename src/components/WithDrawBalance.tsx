import React, { useState } from "react";

// toastify
import { toast } from "react-toastify";

// data
import { config } from "../config";

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

type WithDrawButtonProps = {
  setTransactionPopupState: React.Dispatch<React.SetStateAction<boolean>>;
  setTransactionMessage: React.Dispatch<React.SetStateAction<string>>;
  setTransactionHash: React.Dispatch<React.SetStateAction<string>>;
  validateUser: any;
};

const WithDrawBalance: React.FunctionComponent<WithDrawButtonProps> = ({
  setTransactionPopupState,
  setTransactionMessage,
  setTransactionHash,
  validateUser,
}) => {
  //public key and connection
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const walletAddress = String(publicKey);

  const [amount, setAmount] = useState(0);

  const withDrawBalance = async () => {
    if (!publicKey) {
      return toast.error("Please Connect Your Wallet", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        if (amount === 0) {
          toast.error("0 Sol not allowd!", {
            position: "top-left",
            autoClose: 3000,
          });
        } else {
          toast.loading(
            "Transaction is detected.\n Please do not reload page. You charged 5% For this transaction!",
            { position: "top-left" }
          );

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            walletAddress: publicKey,
            updateBalance: amount,
          });

          fetch(config.widBalance, {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          })
            .then((response) => response.json())
            .then((result) => {
              toast.dismiss();
              setTransactionHash(result.transaction);
              setTransactionMessage(`${amount} sol is Successfully withdrawn`);
              setTransactionPopupState(true);
              validateUser();
              setAmount(0);
            })
            .catch((error) => console.log("error", error));
        }
      } catch (error) {
        console.log(error);

        let msg = (error as Error).message;
        console.log(msg);

        if (msg === "User rejected the request.") {
          toast.error("You cancel transaction request");
          setTimeout(() => {
            toast.dismiss();
          }, 3000);
        } else {
          toast.error("Something went Wrong", {
            position: toast.POSITION.TOP_LEFT,
          });
          setTimeout(() => {
            toast.dismiss();
          }, 3000);
        }
      }
    }
  };
  return (
    <div className="add-balance-card bg-purple w-[90%] md:h-80 md:w-96 mx-auto flex flex-col py-6 justify-center items-center gap-4 text-xl">
      <h1>Withdraw Balance</h1>
      <input
        type="number"
        className="rounded px-3 text-black"
        required
        value={amount === 0 ? "" : amount}
        onChange={(e) => {
          setAmount(Number(e.target.value));
        }}
      />
      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={withDrawBalance}
      >
        Withdraw
      </button>
    </div>
  );
};

export default WithDrawBalance;
