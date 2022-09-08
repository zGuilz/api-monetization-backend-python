const ApiContract = artifacts.require("ApiContract");

module.exports = async (callback) => {
  const [storeOwner, seller] = await web3.eth.getAccounts()
	const buyer = '0x6A04a670e6e7167d6e465CD677872A91ed0fF98B'
  const amount = web3.utils.toWei('4', 'ether')

  const api = await ApiContract.deployed()

  let buyerBal = await web3.eth.getBalance(buyer)
  let sellerBal = await web3.eth.getBalance(seller)
  let storeOwnerBal = await web3.eth.getBalance(storeOwner)

  console.log(`Initial balance of buyer | ${web3.utils.fromWei(buyerBal.toString(), 'ether')}`)
  console.log(`Initial balance of seller   | ${web3.utils.fromWei(sellerBal.toString(), 'ether')}`)
  console.log(`Initial balance of storeOwner   | ${web3.utils.fromWei(storeOwnerBal.toString(), 'ether')}`)

	let priceOfRequests = web3.utils.toWei("1", "ether")
	let apiName = "ursinho"

  // const sale = await api.createSale(
	// 	seller, 
	// 	priceOfRequests, 
	// 	apiName,
	// 	{from: buyer, value: priceOfRequests}
	// )

	const inspectSale = await api.inspectSale(buyer)
	console.log(inspectSale)

	const inspectSaleApi = await api.inspectSaleApi(buyer, "ursinho")
	console.log(inspectSaleApi)

	await api.makeRequest(
		buyer,
		"ursinho99",
		{from: buyer, value: priceOfRequests}
	)

	const inspectSaleApi2 = await api.inspectSaleApi(buyer, "ursinho")
	console.log(inspectSaleApi2)

  buyerBal = await web3.eth.getBalance(buyer)
  sellerBal = await web3.eth.getBalance(seller)
  storeOwnerBal = await web3.eth.getBalance(storeOwner)

  console.log(`Balance of buyer after sales | ${web3.utils.fromWei(buyerBal.toString(), 'ether')}`)
  console.log(`Balance of seller after sales | ${web3.utils.fromWei(sellerBal.toString(), 'ether')}`)
  console.log(`Balance of storeOwner after sales | ${web3.utils.fromWei(storeOwnerBal.toString(), 'ether')}`)

  callback()
}