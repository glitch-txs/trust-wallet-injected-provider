const handleChain = ()=>{

}

export const eventListeners = (injectedProvider: any)=>{
    injectedProvider.addListener("chainChanged", handleChain);

    injectedProvider.addListener("accountsChanged", (accounts: string[]) => {
      if (accounts.length === 0) {
        console.log("Trust Wallet : User has disconnected ")
      } else {
        const connectedAccount = accounts[0];
        
      }
    });
}