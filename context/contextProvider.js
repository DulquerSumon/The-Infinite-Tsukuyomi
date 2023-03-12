import { createContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { contractAddress, abi } from "../constants";

export const Web3Context = createContext();
const injected = new InjectedConnector();
export const ContextProvider = ({ children }) => {
  const [winner, setWinner] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [status, setStatus] = useState("");
  const [entranceFee, setEntranceFee] = useState("");
  const { active, activate, deactivate, library: provider } = useWeb3React();

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) alert("Please Install MeataMask");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      await activate(injected);
    } else {
      console.log("No Accounts Found");
    }
  };
  const connect = async () => {
    if (active) {
      deactivate();
      setCurrentAccount("");
    } else {
      await activate(injected);
      await checkIfWalletIsConnected();
      window.location.reload();
    }
  };

  const lottery = async () => {
    if (typeof window !== "undefined" && !window.ethereum) {
      // eslint-disable-next-line nonblock-statement-body-position
      alert("Please install MetaMask!");
    }
    let contract;
    if (active) {
      const signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddress[0], abi, signer);
    } else {
      const providers = new Web3Provider(window.ethereum);
      contract = new ethers.Contract(contractAddress[0], abi, providers);
    }
    return contract;
  };
  const recentWinner = async () => {
    const contract = await lottery();
    const Winner = await contract.getRecentWinner();
    setWinner(Winner);
  };
  const getStatus = async () => {
    const contract = await lottery();
    const state = await contract.getRaffleState();
    setStatus(state.toString());
  };
  const getEntranceFee = async () => {
    const contract = await lottery();
    const fee = await contract.getEntranceFee();
    setEntranceFee(ethers.utils.formatEther(fee));
  };
  const enter = async () => {
    const contract = await lottery();
    try {
      const enterLottery = await contract.enterRaffle({
        value: ethers.utils.parseEther("0.1"),
      });
      await enterLottery.wait(1);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
    recentWinner();
    getStatus();
    getEntranceFee();
  }, []);

  return (
    <Web3Context.Provider
      value={{ connect, currentAccount, winner, status, entranceFee, enter }}
    >
      {children}
    </Web3Context.Provider>
  );
};
