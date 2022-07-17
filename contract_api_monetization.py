import requests
from connect_db import conecta_db




class ContractApiMonetization():

    def get_id_by_name(self, name):
        #Pesquisa no banco de dados por name e devolve um contrato de api
        db = conecta_db()
        connection = db.cursor()
        query = f"""
        SELECT * FROM "public"."contract_api_monetization" WHERE name = '{name}'
        """
        try:
            connection.execute(query)
            result = connection.fetchone()
            connection.close()
            return result[0] #id

        except Exception as e:
            print(f"Exception: {e}")
            db.rollback()
            connection.close()
    
    
    def get_contract_by_id(self, id):
        #Pesquisa no banco de dados por id e devolve um contrato de api
        db = conecta_db()
        connection = db.cursor()
        query = f"""
        SELECT * FROM "public"."contract_api_monetization" WHERE id = {id}
        """
        try:
            connection.execute(query)
            result = connection.fetchone()
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
            result = connection.fetchone()
            connection.close()
            return result[0] #Tupla dentro de uma lista

        except Exception as e:
            print(f"Exception: {e}")
            db.rollback()
            connection.close()
    
    def redirect_api_by_id(self, id):
        #Pesquisa no banco quantas requisições já foram feitas
        contract = self.get_contract_by_id(id)
        counter_requests_by_id = contract[5] #Counter Requests

        max_quantity_contract = self.get_max_quantity_contract_by_id(id)

        if counter_requests_by_id >= max_quantity_contract:
            # Retorna um 400 ou outro Status code Descrevendo que atingiu o limite
            print("Request Limit")
            return "Request Limit"
        else:
            # Efetua o Redirect para a API e Rota solicitada e inseri no contador +1
            query = f"""
            UPDATE contract_api_monetization
            SET counter_requests = {counter_requests_by_id + 1}
            WHERE id = {id};
            """
            db = conecta_db()
            connection = db.cursor()
            
            try:
                connection.execute(query)
                db.commit()
                connection.close()

            except Exception as e:
                print(f"Exception: {e}")
                db.rollback()
                connection.close()


            return requests.get("https://www.google.com").content

    def create_contract(self, name, max_quantity_contract, amount, cryptocurrency, created_on, company):
        query = f"""
        INSERT INTO contract_api_monetization(name, max_quantity_contract, amount, cryptocurrency, counter_requests, created_on, company)
        VALUES ('{name}', {max_quantity_contract}, {amount}, '{cryptocurrency}', 0, '{created_on}', '{company}');
        """

        db = conecta_db()
        connection = db.cursor()
            
        try:
            connection.execute(query)
            db.commit()
            connection.close()

            return "Contract Create Success"

        except Exception as e:
            print(f"Exception: {e}")
            db.rollback()
            connection.close()

            return "Contract Create Erro"


test = ContractApiMonetization()

print(test.redirect_api_by_id(3))