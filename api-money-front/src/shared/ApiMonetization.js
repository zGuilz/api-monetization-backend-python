import Web3 from "web3";
import { setAlert, setGlobalState } from "../store";
import ApiContract from "./abis/ApiContract.json";

const { ethereum } = window;

const getContract = async () => {
  const web3 = window.web3;
  const networkId = await web3.eth.net.getId();
  const networkData = ApiContract.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(
      ApiContract.abi,
      networkData.address
    );
    return contract;
  } else {
    window.alert("Store contract not deployed to detected network.");
  }
};

const payWithEthers = async (product) => {
  try {
    const web3 = window.web3;
    const seller = product.account;
    const buyer = product.buyer;
    const name = product.name;
    const amount = web3.utils.toWei(product.price.toString(), "ether");

    const contract = await getContract();
    const testando = await contract.methods
      .createSale(seller, amount, name)
      .send({ from: buyer, value: amount });
    console.log("lalala");
    console.log(testando);
    return true;
  } catch (error) {
    setAlert(error.message, "red");
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]);
    setGlobalState("isLoggedIn", true);
  } catch (error) {
    setAlert(JSON.stringify(error), "red");
  }
};

const loadWeb3 = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    window.web3 = new Web3(ethereum);
    await ethereum.enable();

    window.web3 = new Web3(window.web3.currentProvider);

    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setGlobalState("connectedAccount", accounts[0]);
  } catch (error) {
    alert("Please connect your metamask wallet!");
  }
};

export { loadWeb3, connectWallet, payWithEthers };
