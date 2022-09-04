// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ApiContract {
    address public intermediaryAddress;
    string public intermediaryName;

    event Sale(
        address indexed buyer,
        address indexed seller,
        uint256 amount,
        uint256 timestamp
    );

    event Withdrawal(
        address indexed receiver,
        uint256 amount,
        uint256 timestamp
    );

    struct ApiStruct {
        string apiName;
        uint256 numberOfRequests;
    }

    struct SaleStruct {
        address buyer;
        address seller;
        string apiName;
        uint256 priceOfRequests;
        uint256 numberOfRequests;
        bool exists;
        uint256 timestamp;
        mapping(string => ApiStruct) apis;
    }

    mapping(address => SaleStruct) sales;

    constructor(string memory _intermediaryName, address _intermediaryAddress) {
        intermediaryName = _intermediaryName;
        intermediaryAddress = _intermediaryAddress;
    }

    function createSale(
        address _seller,
        uint256 _priceOfRequests,
        string memory _apiName
    ) public payable returns (bool success)
    {
        uint256 _numberOfRequests = 0;

        ApiStruct memory api = ApiStruct(
            _apiName,
            _numberOfRequests
        );

        SaleStruct storage sale = sales[msg.sender];
        sale.buyer = msg.sender;
        sale.seller = _seller;
        sale.apiName = _apiName;
        sale.priceOfRequests = _priceOfRequests;
        sale.numberOfRequests = _numberOfRequests;
        sale.exists = true;
        sale.timestamp = block.timestamp;
        sale.apis[_apiName] = api;

        emit Sale(msg.sender, _seller, _priceOfRequests, block.timestamp);

        return true;
    }

    function makeRequest(address key, string memory _apiName) public payable returns (bool success) {
        require(sales[msg.sender].exists, "You dont have api");
        require(msg.value > 0, "Ethers cannot be zero!");
        uint256 priceOfRequests = sales[key].priceOfRequests;
        address seller = sales[key].seller;
        uint256 tax = (priceOfRequests / 100) * 10;

        withdrawMoneyTo(intermediaryAddress, tax);
        withdrawMoneyTo(seller, priceOfRequests - tax);

        sales[key].apis[_apiName].numberOfRequests += 1;
        return true;
    }

    // TODO: Testar com msg.sender, se der ruim voltar como argumento
    function inspectSaleApi(address key, string memory apiName) public view returns (ApiStruct memory) {
        return (sales[key].apis[apiName]);
    }

    function inspectSale(address key) public view returns (string memory apiName) {
        return sales[key].apiName;
    }

    // function inspectSaleLength(address key) public view returns (uint) {
    //     return sales[key].length;
    // }

    // function inspectSaleSpecific(address key, string calldata apiName) public view returns(SaleStruct memory) {
    //     uint256 saleLength = inspectSaleLength(key);
    //     for (uint i=0; i < saleLength; i++){
    //         if(keccak256(sales[key][i].apiName) == keccak256(apiName)) {
    //             return sales[key][i];
    //         }          
    //     }  
    // }

    // Sends ethers to a specified address
    function _payTo(address _to, uint256 _amount) internal {
        (bool success1, ) = payable(_to).call{value: _amount}("");
        require(success1);
    }

    function withdrawMoneyTo(address receiver, uint256 amount)
        internal
        returns (bool success)
    {

        _payTo(receiver, amount);

        // Captures transfer data on event
        emit Withdrawal(receiver, amount, block.timestamp);
        return true;
    }

}