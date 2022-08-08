import React, { useState } from "react";
import AddBalance from "../components/AddBalance";
import WithDrawBalance from "../components/WithDrawBalance";
import TransactionPopUp from "../components/popUp/TransactionPopUp";
import "./balance.css";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";

type BalanceProps = {
  validateUser: any;
  user: String;
  balance: String;
};

const Balance: React.FunctionComponent<BalanceProps> = ({
  validateUser,
  user,
  balance,
}) => {
  const [transactionPopupState, setTransactionPopupState] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const { publicKey } = useWallet();
  return (
    <div id="balance">
      <div className="container mx-auto">
        {/* show balance  */}
        <div className="show-balance bg-purple flex justify-center items-center flex-col w-[90%] sm:w-96 text-2xl mx-auto py-10 mt-4">
          <div>
            {!publicKey
              ? "Account Address"
              : String(user).length < 5
              ? "loading"
              : user.slice(0, 6) + "..."}
          </div>
          <div>{balance} sol</div>
        </div>

        <div className="flex flex-col mt-4 sm:mt-10 gap-6 justify-center md:flex-row md:justify-center">
          <AddBalance
            setTransactionPopupState={setTransactionPopupState}
            setTransactionMessage={setTransactionMessage}
            setTransactionHash={setTransactionHash}
            validateUser={validateUser}
          />
          <WithDrawBalance
            setTransactionPopupState={setTransactionPopupState}
            setTransactionMessage={setTransactionMessage}
            setTransactionHash={setTransactionHash}
            validateUser={validateUser}
          />
        </div>
      </div>
      <TransactionPopUp
        transactionPopupState={transactionPopupState}
        transactionMessage={transactionMessage}
        transactionHash={transactionHash}
        setTransactionPopupState={setTransactionPopupState}
      />
    </div>
  );
};

export default Balance;
