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

const WithDrawButton: React.FunctionComponent<WithDrawButtonProps> = ({
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
            "Transaction is detected.\n Please do not reload page.",
            { position: "top-left" }
          );

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            walletAddress: publicKey,
            updateBalance: amount,
          });

          fetch(config.addBalance, {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              toast.dismiss();
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

  async function SendTransactionFunction(
    conn: any,
    transaction: any,
    signers: Keypair[]
  ) {
    if (window.solana.publicKey) {
      transaction.feePayer = window.solana.publicKey;
      transaction.recentBlockhash = (
        await conn.getRecentBlockhash("max")
      ).blockhash;
      await transaction.setSigners(
        window.solana.publicKey,
        ...signers.map((s) => s.publicKey)
      );
      if (signers.length != 0) await transaction.partialSign(...signers);
      if (window.solana) {
        const signedTransaction = await window.solana.signTransaction(
          transaction
        );
        let hash = await conn.sendRawTransaction(
          await signedTransaction.serialize()
        );
        let statusCode = 201;
        const confiermationTransaction = JSON.parse(
          JSON.stringify(await conn.confirmTransaction(hash))
        );
        if (confiermationTransaction) {
          statusCode = 200;
        }
        return { status: statusCode, hash: hash };
      }
    }
  }
  return (
    <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <input
        type="number"
        id="email"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        value={amount === 0 ? "" : amount}
        onChange={(e) => {
          setAmount(Number(e.target.value));
        }}
      />
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-3"
        onClick={() => {
          withDrawBalance();
        }}
      >
        Withdraw Balance
      </button>
    </div>
  );
};

export default WithDrawButton;
