import React from "react";
// import { useConnection, useWallet } from "@solana/wallet-adapter-react";

type ShowBalanceProps = {
  // user: String;
  // balance: any;
};

const ShowBalance: React.FunctionComponent<ShowBalanceProps> = (props) => {
  // const { publicKey } = useWallet();

  return (
    <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {/* {!publicKey ? "Account Address" : props.user.slice(0, 6) + "..."} */}
        "Account Address"
      </h5>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {/* {props.balance} SOl */}0 sol
      </h5>
    </div>
  );
};

export default ShowBalance;
