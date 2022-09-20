import ContractAbi from "../artifacts/contracts/Netflix.sol/Netflix.json"
import { ethers } from "ethers";

export default function getContract() {
    // Creating a new provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Getting the signer
    const signer = provider.getSigner();
    // Creating a new contract factory with the signer, address and ABI
    let contract = new ethers.Contract(
        "0x741544db91a643d9eB6E5Ac3ff28f718744e7F48",
        ContractAbi.abi,
        signer
    );

    // Returning the contract
    return contract;
}