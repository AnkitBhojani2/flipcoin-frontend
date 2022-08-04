import React, { useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

type WalletButtonProps = {
  // findAddress: any;
};

const WalletButton: React.FunctionComponent<WalletButtonProps> = (props) => {
  const { publicKey } = useWallet();

  return (
    <div>
      {publicKey ? (
        <WalletDisconnectButton className="wallet-btn" />
      ) : (
        <WalletMultiButton className="wallet-btn" />
      )}
    </div>
  );
};

export default WalletButton;
