import requests


class ContractApiMonetization():

    max_quantity_contract = 0
    counter_requests = 0
    api_name = ""
    

    def __init__(self, max_quantity_contract, api_name):
        self.max_quantity_contract = max_quantity_contract
        self.api_name = api_name

    def get_contract_by_id(self, id):
        #Pesquisa no banco de dados por id e devolve um contrato de api
        return {"id": "dhasjdfgaihsdg", "name": "API Pokemon", "max_quantity_contract": "100000", "amount": "100ETH", "counter_requests": 100}
    
    def get_contracts(self):
        #Retorna todos os contratos de APIS
        return None
    
    def get_max_quantity_contract_by_id(self, id):
        # retorna o valor maximo de requisições do contrato
        return self.max_quantity_contract
    
    def get_counter_requests_by_id(self, id, api, route):
        #Pesquisa no banco quantas requisições já foram feitas
        counter_requests_by_id = 10 #Vai mudar com o retorno do banco
        max_quantity_contract = self.get_max_quantity_contract_by_id(id)

        if counter_requests_by_id >= max_quantity_contract:
            # Retorna um 400 ou outro Status code Descrevendo que atingiu o limite
            return "Request Limit"
        else:
            # Efetua o Redirect para a API e Rota solicitada
            return requests.get("https://www.google.com").content
