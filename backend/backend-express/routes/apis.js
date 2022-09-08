var express = require('express');
var router = express.Router();


const axios = require('axios').default;


const makeRequestBlockchain = async () => {
    const Web3 = require('web3')
    const web3 = new Web3('ws://localhost:7545');
    var contractApi =  require('../shared/ApiContract.json')
    const networkId = await web3.eth.net.getId()
    const networkData = contractApi.networks[networkId]

    if (networkData) {
      const contract = new web3.eth.Contract(contractApi.abi, networkData.address)
      const buyer = "0x6A04a670e6e7167d6e465CD677872A91ed0fF98B"
      const amount = web3.utils.toWei("1", 'ether')
      try {
        await contract.methods
        .makeRequest(buyer, "ursinho99")
        .send({ from: buyer, value: amount })
        console.log("passei")
        return contract
      } catch (error) {
        console.log(error)
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
    await makeRequestBlockchain()
    if (req.query.apiName == "viaCep") {
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
