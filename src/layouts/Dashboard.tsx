import React, { useContext, useState } from "react";

import myGif from "../assets/images/myGif.gif";
import { config } from "../config";
import ResultContext from "../context/ResultContext";

// web3
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { v4 as uuidv4 } from "uuid";

// toastify
import { toast } from "react-toastify";
import WinningPopUp from "../components/popUp/WinningPopUp";
import LossPopUp from "../components/popUp/LossPopUp";

type DashboardProps = {
  validateUser: any;
  balance: any;
};

const Dashboard: React.FunctionComponent<DashboardProps> = ({
  validateUser,
  balance,
}) => {
  const { publicKey, sendTransaction } = useWallet();
  const [coin, setCoin] = useState(0);
  const [amount, setAmount] = useState(0.05);

  // winn and loss
  const [WinningState, setWinningState] = useState(false);
  const [lossState, setLossState] = useState(false);

  const context = useContext(ResultContext);
  const { results, setResults } = context;

  console.log(results);

  const doubleOrNothing = () => {
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
        if (balance > amount) {
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
            walletAddress: publicKey,
            digAmount: amount,
          });

          fetch(config.doubleOrNothing, {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          })
            .then((response) => response.json())
            .then((result) => {
              if (result.status === 0) {
                setLossState(true);
                let newObj = {
                  result: `You loss ${amount} sol`,
                  id: uuidv4(),
                };
                setResults([newObj, ...results]);
              } else if (result.status === 1) {
                setWinningState(true);
                let newObj = {
                  result: `You win ${amount * 2} sol`,
                  id: uuidv4(),
                };
                setResults([newObj, ...results]);
              }
              validateUser();
            })
            .catch((error) => console.log("error", error));
        } else {
          toast.error(`You don't have balance!!`);
        }
      } catch (error) {}
    }
  };

  return (
    <div>
      <div className="main-dash">
        <div className="row flex flex-col lg:flex-row">
          <div className="col-2 flex justify-center items-center lg:justify-start">
            {/* <div className="gif">
            <img src={myGif} alt="" className="myGif w-56 lg:w-40" />
          </div> */}
          </div>

          <div className="col-5 mt-[7vh] inner-dash">
            <div className="flex flex-col">
              {/* head and tail  */}
              <div className="head-tail flex flex-col md:flex-row justify-between gap-7">
                <button
                  className={`${coin === 0 && "rebeccapurple"}`}
                  onClick={() => {
                    setCoin(0);
                  }}
                >
                  TAILS
                </button>
                <button
                  className={`${coin === 1 && "rebeccapurple"}`}
                  onClick={() => {
                    setCoin(1);
                  }}
                >
                  HEADS
                </button>
              </div>

              {/* amounts  */}
              <div className="amounts grid grid-cols-3 gap-4 mt-3 ">
                <button
                  className={`${amount === 0.05 && "rebeccapurple"}`}
                  onClick={() => {
                    setAmount(0.05);
                  }}
                >
                  0.05 sol
                </button>
                <button
                  className={`${amount === 0.25 && "rebeccapurple"}`}
                  onClick={() => {
                    setAmount(0.25);
                  }}
                >
                  0.25 sol
                </button>
                <button
                  className={`${amount === 0.5 && "rebeccapurple"}`}
                  onClick={() => {
                    setAmount(0.5);
                  }}
                >
                  0.5 sol
                </button>
                <button
                  className={`${amount === 1 && "rebeccapurple"}`}
                  onClick={() => {
                    setAmount(1);
                  }}
                >
                  1 sol
                </button>
                <button
                  className={`${amount === 2 && "rebeccapurple"}`}
                  onClick={() => {
                    setAmount(2);
                  }}
                >
                  2 sol
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-4 ">
              <button className="p-3 dig-btn" onClick={doubleOrNothing}>
                Double or Nothing
              </button>
            </div>
          </div>

          <div className="col-5 w-[20vw] ml-auto h-[60vh] bg-white white-board">
            {results.map((result, i) => {
              return (
                <div key={i}>
                  <div>{result.result}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <WinningPopUp
        WinningState={WinningState}
        setWinningState={setWinningState}
        amount={amount * 2}
      />

      <LossPopUp
        lossState={lossState}
        setLossState={setLossState}
        amount={amount}
      />
    </div>
  );
};

export default Dashboard;
