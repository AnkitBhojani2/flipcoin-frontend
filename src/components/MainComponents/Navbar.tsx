import React from "react";
import WalletButton from "../WalletButton";
import { FaBitcoin } from "react-icons/fa";

type WalletButtonProps = {
  //   findAddress: any;
};

const Navbar: React.FunctionComponent<WalletButtonProps> = (props) => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <a
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          href="/"
        >
          <FaBitcoin size="2em" />

          <span className="ml-3 text-xl">FlipCoin</span>
        </a>

        <WalletButton />
      </div>
    </header>
  );
};

export default Navbar;
