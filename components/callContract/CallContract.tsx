import { getTrustWalletInjectedProvider } from "@/actions/helpers/getTrustProvider"
import { ethers } from "ethers"

const CallContract = () => {

    const handleCall = async()=>{

        const trustProvider = await getTrustWalletInjectedProvider()
    
        const provider = new ethers.providers.Web3Provider(trustProvider)
    
        const signer = provider.getSigner()
    
        const contractAddress = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8"
    
        const ERC20ABI = [
            "function name() view returns (string)",
            "function approve(address spender, uint256 amount)"
        ]
    
        const contract = new ethers.Contract(contractAddress, ERC20ABI, signer)
    
        await contract.approve("0x2170Ed0880ac9A755fd29B2688956BD959F933F8",1)
    }

  return (
    <button onClick={handleCall}>CallContract</button>
  )
}

export default CallContract