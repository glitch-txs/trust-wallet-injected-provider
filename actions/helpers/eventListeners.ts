const handleChain = (chainId: string | number)=>{
  console.log("Trust Wallet: user chain id: ", Number(chainId))
}

const handleAccount = (accounts: string[])=>{
    if (accounts.length === 0) {
        console.log("Trust Wallet : User has disconnected")
      } else {
        console.log("Trust Wallet: new user account ",accounts[0])
      }
}

const handleDisconnect = (e: any)=>{
  console.log(e, "Trust Wallet: User has disconnected")
}

export const eventListeners = (injectedProvider: any)=>{
    injectedProvider.addListener("chainChanged", handleChain);

    injectedProvider.addListener("accountsChanged", handleAccount);
    
    injectedProvider.addListener("disconnect", handleDisconnect);
}

export const removeTrustWalletListeners = (injectedProvider: any)=>{
  injectedProvider.removeListener("chainChanged", handleChain);

  injectedProvider.removeListener("accountsChanged", handleAccount);
  
  injectedProvider.removeListener("disconnect", handleDisconnect);
}