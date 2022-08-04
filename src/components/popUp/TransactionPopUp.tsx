import React from "react";

type TransactionPopUpProps = {
  transactionPopupState: Boolean;
  transactionMessage: String;
  transactionHash: String;
  setTransactionPopupState: React.Dispatch<React.SetStateAction<boolean>>;
};

const TransactionPopUp: React.FunctionComponent<TransactionPopUpProps> = ({
  transactionPopupState,
  transactionMessage,
  transactionHash,
  setTransactionPopupState,
}) => {
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      className={`first-letter:overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex ${
        transactionPopupState ? "block" : "hidden"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute top-10 w-full max-w-xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal body */}
          <div className="flex flex-col justify-center items-center py-8">
            <p className="text-xl leading-relaxed text-gray-500 dark:text-gray-400 text-center my-3">
              <div>Ahoy !</div>
              <div>{transactionMessage}</div>
            </p>
            <div>
              <button
                type="button"
                onClick={() => {
                  setTransactionPopupState(false);
                }}
                className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2"
              >
                View on Solscan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPopUp;
