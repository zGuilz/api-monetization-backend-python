import json
from web3 import Web3

provider = Web3.HTTPProvider("http://localhost:7545")

w3 = Web3(provider)

buyer = "0xB5feC19D2a6a62B3999e2144e3753a1f32ec90dF"

print(w3.isConnected())
print(w3.isAddress(buyer))