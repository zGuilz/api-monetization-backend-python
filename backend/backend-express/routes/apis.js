var express = require("express");
var router = express.Router();

const axios = require("axios").default;

const makeRequestBlockchain = async (
  addressWallet,
  apiName,
  url,
  bodyOfRequest,
  method,
  headers
) => {
  const Web3 = require("web3");
  const web3 = new Web3("ws://localhost:7545");
  var contractApi = require("../shared/ApiContract.json");
  const networkId = await web3.eth.net.getId();
  const networkData = contractApi.networks[networkId];

  if (networkData) {
    const contract = new web3.eth.Contract(
      contractApi.abi,
      networkData.address
    );
    const buyer = addressWallet; //TODO: PEGAR ADDRESS DINAMICO
    const amount = web3.utils.toWei("5", "ether"); //TODO: PEGAR VALOR DINAMICO
    try {
      const response = await contract.methods
        .makeRequest(apiName, url, bodyOfRequest, method, headers)
        .send({
          from: buyer,
          value: amount,
          gas: 337786,
          gasPrice: "30000000",
        }); //TODO: PEGAR APINAME DINAMICO
      // const response = await contract.methods
      //   .makeRequest(apiName, url, bodyOfRequest, method, headers)
      //   .estimateGas({ from: buyer });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      var response = Object.keys(error.data)[0];
      if (!error.data[`${response}`].reason) {
        throw "Não há fundos na sua carteira para essa requisição";
      } else {
        throw error.data[`${response}`].reason;
      }
    }
  }
};

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", function (req, res) {
  res.send("Home page");
});

router.post("/", async function (req, res) {
  let responseApi = "";
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  const methodRequest = req.method;
  const bodyRequest = req.body;
  const headers = req.headers;

  try {
    await makeRequestBlockchain(
      req.query.addressWallet,
      req.query.apiName,
      String(fullUrl),
      JSON.stringify(bodyRequest),
      String(methodRequest),
      JSON.stringify(headers)
    );
  } catch (error) {
    console.log(error);
    res.json(error);
    return error;
  }
  if (req.query.apiName == "viacep") {
    let = await axios
      .get(`https://viacep.com.br/ws/${req.query.cep}/json/`)
      .then(function (response) {
        responseApi = response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  if (req.query.apiName == "pokemon") {
    try {
      await makeRequestBlockchain();
    } catch (error) {
      console.log(error);
      res.json(error);
      return error;
    }
    let = await axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      .then(function (response) {
        responseApi = response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  res.json(responseApi);
});
// define the about route

module.exports = router;
