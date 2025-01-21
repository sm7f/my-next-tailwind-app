import React, { useEffect, useState } from "react";
import gasolina from "@/data/precos_combustiveis.json";

function Main() {
  const [precoGasolina, setPrecoGasolina] = useState("");
  const [dataColeta, setDataColeta] = useState("");

  useEffect(() => {
    // Verifica se o JSON é um objeto ou array
    if (Array.isArray(gasolina)) {
      setPrecoGasolina(gasolina[0]?.preco_gasolina || "Preço não encontrado");
      setDataColeta(gasolina[0]?.data_coleta || "Data não encontrada");
    } else {
      setPrecoGasolina(gasolina?.preco_gasolina || "Preço não encontrado");
      setDataColeta(gasolina?.data_coleta || "Data não encontrada");
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-3xl font-bold mb-10 px-4" >
          <h1>
            Preço da Gasolina: {precoGasolina || "Dados não disponíveis"}
          </h1>
          <p>
            Data de Coleta: {dataColeta || "Dados não disponíveis"}
          </p>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded mt-10 mb-10"
          >
            Buscar Preço da Gasolina
          </button>


          <h2 className="text-2xl font-semibold mt-4">
            Palavra Aleatória:
          </h2>

          <button 
            className="px-4 py-2 bg-green-500 text-white rounded mt-4"
          >
            Buscar Palavra Aleatória
          </button>
      </div>
    </section>
  );
}

export default Main;
