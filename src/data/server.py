from flask import Flask, jsonify
import threading
import time
import schedule
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)
CORS(app)  # Habilitando o CORS para todas as origens

# Variável global para armazenar os dados coletados
dados_precos = {
    'preco_gasolina_df': None,
    'preco_gasolina_brasil': None,
    'data_coleta': None
}

# Função de scraping
def executar_scraping():
    url = 'https://precos.petrobras.com.br/w/gasolina/df'
    response = requests.get(url)
    content = response.content
    site = BeautifulSoup(content, 'html.parser')
    preco_elemento = site.find('h2', class_='real-value', id='preco4')
    preco_brasil_elemento = site.find('span', class_='real-value', id='preçomedioBrasil')
    data_elemento = site.find('span', attrs={'data-lfr-editable-id': 'telafinal-textoColeta'})
    
    # Processa os preços e a data, garantindo o formato correto
    preco_gasolina_df = preco_elemento.text.strip().replace(',', '.') if preco_elemento else None
    preco_gasolina_brasil = preco_brasil_elemento.text.strip().replace(',', '.') if preco_brasil_elemento else None
    data_coleta = data_elemento.text.strip() if data_elemento else None

    if preco_gasolina_df and preco_gasolina_brasil and data_coleta:
        # Atualiza os dados na variável em memória
        dados_precos['preco_gasolina_df'] = preco_gasolina_df
        dados_precos['preco_gasolina_brasil'] = preco_gasolina_brasil
        dados_precos['data_coleta'] = data_coleta
        print("Scraping executado e dados armazenados na memória!")
        print(f"Preço gasolina DF: {preco_gasolina_df}")
        print(f"Preço gasolina Brasil: {preco_gasolina_brasil}")
        print(f"Data da coleta: {data_coleta}")
    else:
        print("Dados não encontrados.")

# Agendar a tarefa para rodar a cada 15 dias
def iniciar_agendador():
    schedule.every(15).days.at("10:00").do(executar_scraping)
    while True:
        schedule.run_pending()
        time.sleep(1)

# API para consultar os preços
@app.route('/api/precos', methods=['GET'])
def obter_precos():
    if dados_precos['preco_gasolina_df'] and dados_precos['preco_gasolina_brasil'] and dados_precos['data_coleta']:
        return jsonify(dados_precos)
    else:
        return jsonify({"erro": "Dados ainda não coletados ou indisponíveis."}), 404

if __name__ == '__main__':
    # Iniciar o agendador em uma thread separada
    threading.Thread(target=iniciar_agendador, daemon=True).start()
    # Executar o scraping ao iniciar o servidor (opcional)
    executar_scraping()
    # Rodar o servidor web
    app.run(debug=True)
