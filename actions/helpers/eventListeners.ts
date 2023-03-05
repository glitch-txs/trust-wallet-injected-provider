import { checkAccountAndChainId } from "./checkAccountAndChain"
// import { useWeb3Store } from '../../../store/web3store'
import { checkTrustWallet } from "./checkTrustWallet"

type ConnectInfo = {
    chainId: string
}

const handleAccount = (accounts: string[]) => {
    if(typeof accounts[0] !== 'undefined'){
        //if Metamask is locked then the provider won't get the user account as if they were connected
        //If use unlock their metamask wallet after connecting to WC then there will be a conflict between them
        // useWeb3Store.getState().disconnectWC()
        // useWeb3Store.setState({ userAccount: accounts[0]})
        console.log('TrustWallet: user changed address to: ', accounts[0])
      }else{
        // useWeb3Store.setState({ userAccount: ''})
        // useWeb3Store.getState().restartWeb3()
        console.log('TrustWallet: user has disconnect')
      }
}

const handleChain = (chainId: string) => {
    // useWeb3Store.setState({ chainId })
    console.log('TrustWallet: chain id - ', chainId)
}

const handleConnect = (connectInfo: ConnectInfo)=>{
    const provider = checkTrustWallet()
    checkAccountAndChainId(provider)
    // useWeb3Store.setState({ isProvider: true })
    console.log('TrustWallet: provider is connected in:', connectInfo.chainId)
}

const handleDisconnect = (err: any)=>{
    // useWeb3Store.setState({ isProvider: false })
    console.log('TrustWallet: the provider is desconnected from blockchain, refresh the dapp and check your internet connection')
    console.error(err)
}

//Init Metamask API event listeners
export const eventListeners = (provider: any)=>{

    provider.on("accountsChanged", handleAccount);

    provider.on("chainChanged", handleChain);

    provider.on('connect', handleConnect);

    provider.on('disconnect', handleDisconnect);
}

export const removeEventsTrustWallet = (provider: any)=>{

    provider.removeListener("accountsChanged", handleAccount);

    provider.removeListener("chainChanged", handleChain);

    provider.removeListener('connect', handleConnect);

    provider.removeListener('disconnect', handleDisconnect);
}