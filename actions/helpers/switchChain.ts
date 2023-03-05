export const switchChain = async (injectedProvider: any) => {
    try {
      if(injectedProvider != null)
      await injectedProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    } catch (e: any) {
      if (e.code === 4001) {
        console.log("User rejected switching chains.")
      } else {
        console.error(e)
      }
    }
  }