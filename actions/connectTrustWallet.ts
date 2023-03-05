import { checkAccountAndChainId } from "./helpers/checkAccountAndChain"
import { checkTrustWallet } from "./helpers/checkTrustWallet"

export const connectToMetamask = async ()=>{

    window.localStorage.clear()

    const provider = checkTrustWallet()

    if(Boolean(provider)){

        const requestConnection = async ()=>{
            await provider.request({ method: 'eth_requestAccounts' })
            .then(()=> checkAccountAndChainId(provider))
            .catch((err: any) => {
              if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                console.log('Trust Wallet: user rejected the connection request');
              } else {
                console.error('Trust Wallet: request connection error',err);
              }
            });
        }

          // Trust Wallet will asks first to switch to the desired chain network, if user doesn't have the network listed it will
          // request to add it automatically, after the user is in the intended network it will asks him to connect.
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          }).then(requestConnection).catch(async (er: any)=>{
            if(er.code === 4902 || er?.data?.originalError?.code == 4902){
              
                await provider.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x38',
                      chainName: 'Smart Chain',
                      nativeCurrency: {
                        name: 'BNB',
                        symbol: 'BNB',
                        decimals: 18,
                      },
                      rpcUrls: ['https://bsc-dataseed.binance.org/'],
                      blockExplorerUrls: ['https://bscscan.com'],
                      iconUrls: [''], // Currently ignored by Trust Wallet?.
                    },
                  ],
                })
                .then(requestConnection)
                .catch((er: any)=>console.error("Trust Wallet: user rejected the add new chain request",er))
            }
          })
    }

    return provider
}