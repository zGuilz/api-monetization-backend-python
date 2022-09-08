import { Web3 } from 'web3'
import ApiContract from '../../build/contracts/ApiContract.json'
import { WebConnect } from '../backend-api-management/src/shared/web3'

const web3 = Web3

const getContract = async () => {
  const web3 = Web3
  const networkId = 1337
  const networkData = ApiContract.networks[networkId]

  if (networkData) {
    const contract = new web3.eth.Contract(ApiContract.abi, networkData.address)
    return contract
  } else {
    window.alert('Store contract not deployed to detected network.')
  }
}

export const makeRequest = async (product) => {
  try {
    
    console.log("passei aqui")
    const seller = product.seller
    console.log(web3)
    const amount = web3.utils.toWei(product.price.toString(), 'ether')
    const buyer = product.buyer

    const contract = await getContract()
    await contract.methods
      .makeRequest(buyer, purpose)
      .send({ from: buyer, value: amount })
    return true
  } catch (error) {
    console.log(`Error na transacao ${error}`)
  }
}
