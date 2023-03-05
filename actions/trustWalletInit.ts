import { checkAccountAndChainId } from "./helpers/checkAccountAndChain"
import { checkTrustWallet } from "./helpers/checkTrustWallet"
import { eventListeners, removeEventsTrustWallet } from "./helpers/eventListeners"

export const metamaskInit = async ()=>{
    const provider = checkTrustWallet()
    if (Boolean(provider)){
        //prevent duplicates on event listeners when restarting
        removeEventsTrustWallet(provider)
        
        eventListeners(provider)
        await checkAccountAndChainId(provider)
    }
    
    return provider
}