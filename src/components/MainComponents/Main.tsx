// react
import React, { useState } from "react";

// components
import ShowBalance from "../ShowBalance";
import WithDrawButton from "../WithDrawButton";
import AddButton from "../AddButton";
import TransactionPopUp from "../popUp/TransactionPopUp";

type MainProps = {
  user: String;
  balance: any;
  validateUser: any;
};

const Main: React.FunctionComponent<MainProps> = ({
  user,
  balance,
  validateUser,
}) => {
  const [transactionPopupState, setTransactionPopupState] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-wrap -m-4 text-center justify-between">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <ShowBalance user={user} balance={balance} />
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <AddButton
                setTransactionPopupState={setTransactionPopupState}
                setTransactionMessage={setTransactionMessage}
                setTransactionHash={setTransactionHash}
                validateUser={validateUser}
              />
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <WithDrawButton
                setTransactionPopupState={setTransactionPopupState}
                setTransactionMessage={setTransactionMessage}
                setTransactionHash={setTransactionHash}
                validateUser={validateUser}
              />
            </div>
          </div>
        </div>
      </section>

      <TransactionPopUp
        transactionPopupState={transactionPopupState}
        transactionMessage={transactionMessage}
        transactionHash={transactionHash}
        setTransactionPopupState={setTransactionPopupState}
      />
    </div>
  );
};

export default Main;
