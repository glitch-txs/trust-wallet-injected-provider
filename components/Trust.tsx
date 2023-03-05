import { getTrustWalletInjectedProvider } from "@/actions/helpers/getTrustProvider";
import React from "react";

// This is the same implementation presented in the previous sections.

const Trust = () => {
  const [initializing, setInitializing] = React.useState(true);
  const [injectedProvider, setInjectedProvider] = React.useState<any>(null);
  const [initializationError, setInitializationError] = React.useState("");

  const [connected, setConnected] = React.useState(false);
  const [selectedAccount, setSelectedAccount] = React.useState("");
  const [chainId, setChainId] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const initializeInjectedProvider = async () => {
      const trustWallet = await getTrustWalletInjectedProvider();

      if (!trustWallet) {
        setInitializationError("Trust Wallet is not installed.");
        setInitializing(false);
        return;
      }

      setInjectedProvider(trustWallet);
      setInitializing(false);
    };

    initializeInjectedProvider();
  }, []);

  const connect = async () => {
    try {
      setError("");

      const accounts = await injectedProvider.request({
        method: "eth_requestAccounts",
      });

      const chainId = await injectedProvider.request({ method: "eth_chainId" });

      setSelectedAccount(accounts[0]);
      setChainId(chainId);
      setConnected(true);

      injectedProvider.addListener("chainChanged",(e: any)=>{
        setChainId(e)
        console.log(e)
      } );

      injectedProvider.addListener("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          setConnected(false);
          setSelectedAccount("");
          setChainId("");
        } else {
          const connectedAccount = accounts[0];
          setSelectedAccount(connectedAccount);
        }
        console.log(accounts)
      });
    } catch (e: any) {
      console.error(e);
      if (e.code === 4001) {
        setError("User denied connection.");
      }
    }
  };

  const switchChain = async () => {
    try {
      if(injectedProvider != null)
      await injectedProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    } catch (e: any) {
      console.error(e);
      if (e.code === 4001) {
        setError("User rejected switching chains.");
      }
    }
  };

  if (initializing) {
    return <p>Waiting for provider...</p>;
  }

  if (initializationError) {
    return <p style={{ color: "red" }}>{initializationError}</p>;
  }

  if (connected) {
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <p>Selected account: {selectedAccount}</p>
        <p>Selected chainId: {chainId}</p>
        {chainId !== "0x1" && (
          <button onClick={switchChain}>Switch to Ethereum</button>
        )}
      </div>
    );
  }

  return (
    <div>
      <p style={{ color: "red" }}>{error}</p>
      <button onClick={connect}>Connect</button>
    </div>
  );
};

export default Trust;