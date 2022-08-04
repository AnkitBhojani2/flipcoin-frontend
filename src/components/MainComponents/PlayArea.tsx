import React, { useState } from "react";

// web3
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

// toastify
import { toast } from "react-toastify";
import WinningPopUp from "../popUp/WinningPopUp";
import LossPopUp from "../popUp/LossPopUp";

const PlayArea = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [coin, setCoin] = useState(0);
  const [amount, setAmount] = useState(0.05);

  // winn and loss
  const [WinningState, setWinningState] = useState(false);
  const [lossState, setLossState] = useState(false);

  const showResult = () => {
    if(amount) {

    var axios = require("axios");
    var data = JSON.stringify({
      walletAddress: publicKey,
      digAmount: amount,
    });

    var config = {
      method: "post",
      url: "https://flipcoin-backend-1.herokuapp.com/api/transaction/doubleOrNothing",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response:any) {
        if(response.data.status === 1) {
          setWinningState(true)
          setTimeout(()=>{
            window.location.reload();
          }, 3000);
        } else {
          setLossState(true)
          setTimeout(()=>{
            window.location.reload();
          }, 3000);
        }
      })
      .catch(function (error:any) {
        console.log(error);
      });

    }
    // setLossState(true);
  };

  return (
    <div>
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

      <WinningPopUp
        WinningState={WinningState}
        setWinningState={setWinningState}
      />

      <LossPopUp lossState={lossState} setLossState={setLossState} />
    </div>
  );
};

export default PlayArea;
