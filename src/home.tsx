import { useAccount, useChains, useSignTypedData } from "wagmi"
import { type SignTypedDataParameters } from "@wagmi/core"

import { parseAbi } from "viem"
import { Button } from "./components/ui/button"

const GREETER_CONTRACT_ADDRESS = "0x374257dC5707AEDCC1D4F7D0d1b476a57Fc11194"
const USDC = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"

export function Home() {
  const { address, isConnected, chain } = useAccount()

  console.log(address, isConnected, chain)
  const { data: signature, error, signTypedData } = useSignTypedData()
  console.log("data", signature, "error", error)

  const signMessage = async () => {
    signTypedData({
      domain: {
        // Give a user friendly name to the specific contract you are signing for.
        name: "Ether Mail",
        version: "1",
        // Defining the chain
        chainId: chain?.id,
        // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
        verifyingContract: GREETER_CONTRACT_ADDRESS,
      },
      primaryType: "Greeting",
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Greeting: [
          { name: "text", type: "string" },
          { name: "deadline", type: "uint" },
        ],
      },
      message: {
        text: "Hello world",
        deadline: "1706997180",
      },
    })
  }

  const signUSDCPermit = async () => {
    signTypedData({
      domain: {
        // Give a user friendly name to the specific contract you are signing for.
        name: "USD Coin",
        version: "2",
        // Defining the chain
        chainId: chain?.id,
        // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
        verifyingContract: USDC,
      },
      primaryType: "Permit",
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Permit: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
            { name: "value", type: "uint256" },
            { name: "nonce", type: "uint256" },
            { name: "deadline", type: "uint256" },
          ],
      },
      message: {
        owner: address!,
        spender: "0xd2A39425aE1cbF479dD8900cB998064167B960A5",
        value: 2000000n,
        nonce: 0,
        deadline: 1711402675,
      },
    })
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <Button onClick={signMessage}>Sign message</Button>
        <Button onClick={signUSDCPermit}>transferUSDC</Button>
      </div>
    </section>
  )
}
