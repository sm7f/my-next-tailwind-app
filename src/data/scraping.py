import requests
from bs4 import BeautifulSoup
import json
import os

# URL do site de preços da Petrobras
url = 'https://precos.petrobras.com.br/w/gasolina/df'

# Fazendo a requisição
response = requests.get(url)
content = response.content

# Analisando o conteúdo HTML
site = BeautifulSoup(content, 'html.parser')

# Encontrando o elemento que contém o preço
preco_elemento = site.find('h2', class_='real-value', id='preco4')

# Extraindo o preço
if preco_elemento:
    preco_gasolina = preco_elemento.text.strip()
    # Criando a estrutura JSON
    dados_precos = {
        'preco_gasolina': preco_gasolina
    }

    # Definindo o caminho do arquivo JSON
    caminho_arquivo_json = 'C:/Users/Maqplan/Downloads/HERBERTH/gasolina-scraping/my-next-tailwind-app/src/data/precos_combustiveis.json'

    # Salvando os dados em um arquivo JSON
    with open(caminho_arquivo_json, 'w', encoding='utf-8') as json_file:
        json.dump(dados_precos, json_file, ensure_ascii=False, indent=4)

    print(f"Preço da gasolina salvo em {caminho_arquivo_json}")
else:
    print("Preço não encontrado.")
