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

type AddBalanceProps = {
  setTransactionPopupState: React.Dispatch<React.SetStateAction<boolean>>;
  setTransactionMessage: React.Dispatch<React.SetStateAction<string>>;
  setTransactionHash: React.Dispatch<React.SetStateAction<string>>;
  validateUser: any;
};

const AddBalance: React.FunctionComponent<AddBalanceProps> = ({
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

  const addBalance = async () => {
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
      const userSOLBalance =
        (await connection.getBalance(publicKey)) / LAMPORTS_PER_SOL;

      if (userSOLBalance > Number(amount)) {
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

            const finalAmount = parseFloat((amount + amount * 0.05).toFixed(2));

            const transaction = new Transaction().add(
              SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(config.SOL_RECIVER_ADDRESS),
                lamports: finalAmount * LAMPORTS_PER_SOL,
              })
            );

            const signature = await SendTransactionFunction(
              connection,
              transaction,
              []
            );

            if (signature && signature?.status === 200) {
              toast.dismiss();
              setTransactionMessage(`${amount} sol is Successfully Added`);

              setTransactionHash(signature.hash);
              setTransactionPopupState(true);

              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              const raw = JSON.stringify({
                walletAddress: walletAddress,
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
                  validateUser();
                  setAmount(0);
                })
                .catch((error) => console.log("error", error));
            }
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
      } else {
        toast.error(
          `required minimum ${amount} SOL. You have right now ${userSOLBalance} SOL`
        );
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
    <div className="add-balance-card bg-purple w-[90%] md:h-80 md:w-96 mx-auto flex flex-col py-6 justify-center items-center gap-4 text-xl">
      <h1>Add Balance</h1>
      <input
        type="number"
        className="rounded px-3 text-black"
        required
        value={amount === 0 ? "" : amount}
        onChange={(e) => {
          setAmount(parseFloat(e.target.value));
        }}
      />
      <button
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={() => {
          addBalance();
        }}
      >
        Deposite
      </button>
    </div>
  );
};

export default AddBalance;
