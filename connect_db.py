import psycopg2

# Função para criar conexão no banco
def conecta_db():
  con = psycopg2.connect(host='kesavan.db.elephantsql.com', 
                         database='gujuhcwl',
                         user='gujuhcwl', 
                         password='AnweW9dSNIF45Mm9Ux7hb5l5jF_iw93l')
  return con