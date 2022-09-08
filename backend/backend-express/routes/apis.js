var express = require('express');
var router = express.Router();


const axios = require('axios').default;


const makeRequestBlockchain = async (apiName) => {
    const Web3 = require('web3')
    const web3 = new Web3('ws://localhost:7545');
    var contractApi =  require('../shared/ApiContract.json')
    const networkId = await web3.eth.net.getId()
    const networkData = contractApi.networks[networkId]

    if (networkData) {
      const contract = new web3.eth.Contract(contractApi.abi, networkData.address)
      const buyer = "0x01d0f47e384b603E499769e487C3BD0C686Aa6a8" //TODO: PEGAR ADDRESS DINAMICO
      const amount = web3.utils.toWei("0.04", 'ether') //TODO: PEGAR VALOR DINAMICO
      try {
        const response = await contract.methods
        .makeRequest(buyer, apiName) //TODO: PEGAR APINAME DINAMICO
        .send({ from: buyer, value: amount })
        return contract
      } catch (error) {
        var response = Object.keys(error.data)[0]
        if (!error.data[`${response}`].reason) {
          throw "Não há fundos na sua carteira para essa requisição"
        } else {
          throw error.data[`${response}`].reason
        }
        
      }
     
    }
}

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Home page');
});


router.post('/', async function(req, res) {
    let responseApi = ""
    try {
      await makeRequestBlockchain(req.query.apiName)
    } catch(error){
      console.log(error)
      res.json(error)
      return error
    }
    if (req.query.apiName == "UrsinhoAPI") {
        let = await axios.get(`https://viacep.com.br/ws/${req.query.cep}/json/`)
        .then(function (response) {
            responseApi = response.data
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    if (req.query.apiName == "pokemon") {
      let responseApi = ""
      try {
        await makeRequestBlockchain()
      } catch(error){
        console.log(error)
        res.json(error)
        return error
      }
      let = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      .then(function (response) {
          responseApi = response.data
      })
      .catch(function (error) {
          // handle error
          console.log(error);
      })
    }
    
    res.json(responseApi);
  });
// define the about route

module.exports = router;
