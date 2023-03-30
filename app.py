from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
import requests
import zipfile
import datetime as dt
import os
import pickle
import time
import io
import base64
import hashlib
from io import BytesIO

# Insira aqui as funções auxiliares: export_file e consultar_fundos
# ...

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/consultar_fundos', methods=['POST'])
def consultar():
    # Receba os dados do formulário enviado pelo JavaScript
    data = request.form['data']
    tipo = request.form['tipo']
    lista = request.form.getlist('lista[]')

    # Realize a consulta e retorne os resultados como JSON
    resultado = consultar_fundos(lista, data, tipo)
    return jsonify(resultado.to_dict(orient='records'))

if __name__ == "__main__":
    app.run(debug=True)