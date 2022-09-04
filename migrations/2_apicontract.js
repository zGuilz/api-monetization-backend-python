const ApiContract = artifacts.require("ApiContract");

module.exports = async (deployer) => {
   const [_feeAccount] = await web3.eth.getAccounts()
   console.log(_feeAccount)

   const _name = "Guikagulu"


   await deployer.deploy(
      ApiContract,
      _name,
      _feeAccount
   ); 
};