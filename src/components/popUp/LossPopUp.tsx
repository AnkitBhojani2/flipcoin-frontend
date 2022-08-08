import React from "react";
import { FaFrown } from "react-icons/fa";

type LossPopUpProps = {
  lossState: Boolean;
  setLossState: React.Dispatch<React.SetStateAction<boolean>>;
  amount: number;
};

const LossPopUp: React.FunctionComponent<LossPopUpProps> = ({
  lossState,
  setLossState,
  amount,
}) => {
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      className={`first-letter:overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex ${
        lossState ? "block" : "hidden"
      }`}
      aria-modal="true"
      role="dialog"
    >
      <div className="absolute top-10 w-full max-w-xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal body */}
          <div className="flex flex-col justify-center items-center py-8">
            <div>
              <FaFrown color="yellow" size="6em" />
            </div>
            <div className="text-xl leading-relaxed text-gray-500 dark:text-gray-400 text-center my-3">
              <div>Sorry ! You lose {amount} sol</div>
              <div>Beter Luck Next Time</div>
            </div>
            <div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  setLossState(false);
                }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LossPopUp;
