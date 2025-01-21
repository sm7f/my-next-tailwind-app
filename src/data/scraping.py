from flask import Flask, jsonify
import threading
import time
import schedule
import json
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

# Função de scraping
def executar_scraping():
    url = 'https://precos.petrobras.com.br/w/gasolina/df'
    response = requests.get(url)
    content = response.content
    site = BeautifulSoup(content, 'html.parser')
    preco_elemento = site.find('h2', class_='real-value', id='preco4')
    data_elemento = site.find('span', attrs={'data-lfr-editable-id': 'telafinal-textoColeta'})

    preco_gasolina = preco_elemento.text.strip() if preco_elemento else None
    data_coleta = data_elemento.text.strip() if data_elemento else None

    if preco_gasolina and data_coleta:
        dados_precos = {
            'preco_gasolina': preco_gasolina,
            'data_coleta': data_coleta
        }
        caminho_arquivo_json = './src/data/precos_combustiveis.json'
        with open(caminho_arquivo_json, 'w', encoding='utf-8') as json_file:
            json.dump(dados_precos, json_file, ensure_ascii=False, indent=4)
        print("Scraping executado e JSON atualizado!")
    else:
        print("Dados não encontrados.")

# Agendar a tarefa para rodar a cada 15 dias
def iniciar_agendador():
    schedule.every(15).days.at("10:00").do(executar_scraping)
    while True:
        schedule.run_pending()
        time.sleep(1)

# API para consultar os preços
@app.route('/precos', methods=['GET'])
def obter_precos():
    with open('./src/data/precos_combustiveis.json', 'r', encoding='utf-8') as f:
        dados = json.load(f)
    return jsonify(dados)

if __name__ == '__main__':
    # Iniciar o agendador em uma thread separada
    threading.Thread(target=iniciar_agendador, daemon=True).start()
    # Rodar o servidor web
    app.run(debug=True)
