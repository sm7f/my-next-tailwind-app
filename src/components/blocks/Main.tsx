import React, { useEffect, useState } from "react";
import gasolina from "@/data/preco_gasolina.json";

function Main() {
  const [precoGasolina, setPrecoGasolina] = useState("");

  useEffect(() => {
    // Verifica se o JSON é um objeto ou array
    if (Array.isArray(gasolina)) {
      setPrecoGasolina(gasolina[0]?.preco_gasolina || "Preço não encontrado");
    } else {
      setPrecoGasolina(gasolina?.preco_gasolina || "Preço não encontrado");
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Preço da Gasolina: {precoGasolina}
      </h1>
      {/* Você pode adicionar mais conteúdo aqui, se necessário */}
    </section>
  );
}

export default Main;
