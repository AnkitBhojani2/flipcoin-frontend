import React from "react";
import Logo from "../assets/images/logoSSS.png";
import WalletButton from "../components/WalletButton";

type NavbarProps = {
  showDashboard: Boolean;
  setshowDashboard: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FunctionComponent<NavbarProps> = ({
  showDashboard,
  setshowDashboard,
}) => {
  const handleDashboard = () => {
    if (showDashboard === true) {
      setshowDashboard(false);
    } else {
      setshowDashboard(true);
    }
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center mt-3 gap-4">
        <button
          type="button"
          className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-10 py-3 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
          onClick={handleDashboard}
        >
          {showDashboard ? "Balance" : "Play Game"}
        </button>
        <WalletButton />
      </div>
    </div>
  );
};

export default Navbar;
