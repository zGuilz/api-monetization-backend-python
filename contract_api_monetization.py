import requests
from connect_db import conecta_db




class ContractApiMonetization():

    max_quantity_contract = 0
    counter_requests = 0
    api_name = ""
    

    def __init__(self, max_quantity_contract, api_name):
        self.max_quantity_contract = max_quantity_contract
        self.api_name = api_name

    def get_contract_by_id(self, id):
        #Pesquisa no banco de dados por id e devolve um contrato de api
        db = conecta_db()
        connection = db.cursor()
        query = f"""
        SELECT * FROM "public"."contract_api_monetization" WHERE id = {id}
        """
        try:
            connection.execute(query)
            result = connection.fetchall()
            connection.close()
            return result

        except Exception as e:
            print(f"Exception: {e}")
            db.rollback()
            connection.close()
        

    
    def get_contracts(self):
        #Retorna todos os contratos de APIS
        db = conecta_db()
        connection = db.cursor()
        query = f"""
        SELECT * FROM "public"."contract_api_monetization"
        """
        try:
            connection.execute(query)
            result = connection.fetchall()
            connection.close()
            return result

        except Exception as e:
            print(f"Exception: {e}")
            db.rollback()
            connection.close()
    
    def get_max_quantity_contract_by_id(self, id):
        # retorna o valor maximo de requisições do contrato
        db = conecta_db()
        connection = db.cursor()
        query = f"""
        SELECT max_quantity_contract FROM "public"."contract_api_monetization" WHERE id = {id}
        """
        try:
            connection.execute(query)
            result = connection.fetchall()
            connection.close()
            return result[0][0] #Tupla dentro de uma lista

        except Exception as e:
            print(f"Exception: {e}")
            db.rollback()
            connection.close()
    
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

test = ContractApiMonetization(100, "Dummy")
print(test.get_max_quantity_contract_by_id(2))