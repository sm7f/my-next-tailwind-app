from flask import Flask, jsonify
import random
from flask_cors import CORS  # Importando o CORS

app = Flask(__name__)

# Habilitando o CORS para todas as origens (pode ser restrito a domínios específicos)
CORS(app)

# Lista de palavras aleatórias
palavras = ["Python", "React", "Node.js", "JSON", "API", "Scraping", "Flask"]

@app.route('/api/palavra', methods=['GET'])
def palavra_aleatoria():
    palavra = random.choice(palavras)
    return jsonify({"palavra": palavra})

if __name__ == '__main__':
    app.run(debug=True)
