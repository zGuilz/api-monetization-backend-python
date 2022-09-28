const ApiContract = artifacts.require("ApiContract");

module.exports = async (callback) => {
  const [storeOwner, seller] = await web3.eth.getAccounts();
  const buyer = "0x8B50AF012d4f8c69f65AEEc89d82d4bccdE00Ad4";
  const amount = web3.utils.toWei("4", "ether");

  const api = await ApiContract.deployed();

  let buyerBal = await web3.eth.getBalance(buyer);
  let sellerBal = await web3.eth.getBalance(seller);
  let storeOwnerBal = await web3.eth.getBalance(storeOwner);

  console.log(
    `Initial balance of buyer | ${web3.utils.fromWei(
      buyerBal.toString(),
      "ether"
    )}`
  );
  console.log(
    `Initial balance of seller   | ${web3.utils.fromWei(
      sellerBal.toString(),
      "ether"
    )}`
  );
  console.log(
    `Initial balance of storeOwner   | ${web3.utils.fromWei(
      storeOwnerBal.toString(),
      "ether"
    )}`
  );

  let priceOfRequests = web3.utils.toWei("5", "ether");
  let apiName = "viacep";

  // const sale = await api.createSale(seller, priceOfRequests, apiName, {
  //   from: buyer,
  //   value: priceOfRequests,
  // });

  // const inspectSale = await api.inspectSale(buyer);
  // console.log(inspectSale);

  const inspectSaleApi = await api.inspectSaleApi(buyer, "viacep");
  console.log(inspectSaleApi);

  //   address buyer,
  //   string memory _apiName,
  //   string memory _url,
  //   string memory _bodyOfRequest,
  //   string memory _method,
  //   string memory _headers

  await api.makeRequest(apiName, "http://localhost", "{}", "GET", "TEste", {
    from: buyer,
    value: priceOfRequests,
  });

  // const errinho = await api.makeRequest(
  // 	buyer,
  // 	"ursinho12",
  // 	{from: buyer, value: priceOfRequests}
  // )

  // console.log(errinho.data[0])

  buyerBal = await web3.eth.getBalance(buyer);
  sellerBal = await web3.eth.getBalance(seller);
  storeOwnerBal = await web3.eth.getBalance(storeOwner);

  console.log(
    `Balance of buyer after sales | ${web3.utils.fromWei(
      buyerBal.toString(),
      "ether"
    )}`
  );
  console.log(
    `Balance of seller after sales | ${web3.utils.fromWei(
      sellerBal.toString(),
      "ether"
    )}`
  );
  console.log(
    `Balance of storeOwner after sales | ${web3.utils.fromWei(
      storeOwnerBal.toString(),
      "ether"
    )}`
  );

  callback();
};
