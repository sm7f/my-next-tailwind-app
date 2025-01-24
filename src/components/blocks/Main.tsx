import React, { useState } from "react";

function Main() {
  const [precoGasolinaBrasil, setPrecoGasolinaBrasil] = useState("");
  const [precoGasolinaDF, setPrecoGasolinaDF] = useState("");
  const [dataColeta, setDataColeta] = useState("");
  const [loadingGasolina, setLoadingGasolina] = useState(false);

  const buscarPrecoGasolina = async () => {
    setLoadingGasolina(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/precos");
      if (!response.ok) throw new Error("Erro ao buscar dados da gasolina");

      const data = await response.json();
      setPrecoGasolinaBrasil(data.preco_gasolina_brasil);
      setPrecoGasolinaDF(data.preco_gasolina_df);
      setDataColeta(data.data_coleta);
    } catch (error) {
      console.error("Erro:", error);
      setPrecoGasolinaBrasil("Não foi possível carregar o preço médio.");
      setPrecoGasolinaDF("Não foi possível carregar o preço no DF.");
      setDataColeta("Data de coleta indisponível.");
    } finally {
      setLoadingGasolina(false);
    }
  };

  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  );

  interface BotaoBuscarProps {
    onClick: () => void; // Função sem parâmetros e sem retorno
    loading: boolean;    // Indica se o botão está em estado de carregamento
  }
  
  const BotaoBuscar: React.FC<BotaoBuscarProps> = ({ onClick, loading }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
      disabled={loading}
    >
      {loading ? (
        <>
          <LoadingSpinner />
          Buscando...
        </>
      ) : (
        "Buscar Preço"
      )}
    </button>
  );

  return (
    <section className="my-28">
      <div className="relative mx-auto border-gray-300 dark:border-gray-800 bg-gray-300 dark:bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800 flex flex-col items-center justify-center p-6">
          <h1 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
            Preço Médio Gasolina - Brasil:
          </h1>
          <p className="text-base mb-2 text-gray-700 dark:text-gray-300">
            {loadingGasolina
              ? "Carregando..."
              : precoGasolinaBrasil || "Dados não disponíveis"}
          </p>
          <h1 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
            Preço Médio Gasolina - DF:
          </h1>
          <p className="text-base mb-2 text-gray-700 dark:text-gray-300">
            {loadingGasolina
              ? "Carregando..."
              : precoGasolinaDF || "Dados não disponíveis"}
          </p>
          <h2 className="text-lg font-bold mt-6 mb-2 text-gray-900 dark:text-gray-100">
            Data de Coleta:
          </h2>
          <p className="text-base mb-4 text-gray-700 dark:text-gray-300">
            {loadingGasolina
              ? "Carregando..."
              : dataColeta || "Dados não disponíveis"}
          </p>
          <BotaoBuscar onClick={buscarPrecoGasolina} loading={loadingGasolina} />
        </div>
      </div>
    </section>
  );
}

export default Main;
