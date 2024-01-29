import { useState } from "react";
import CurrencyForm from "./components/CurrencyForm";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

// Defina um tipo para o objeto de dados
interface FormData {
  crypto: string;
  amount: number;
}

interface Dados {
  name: string;
  category: string;
  symbol: string;
  website: string;
  logo: string;
  // reddit: string[];
  // technical_doc: string[];
  // source_code: string[];
  urls: {
    reddit?: string[];
    technical_doc?: string[];
    source_code?: string;
  };
}

const MyForm = () => {
  const [responseData, setResponseData] = useState<Dados[]>([]); // inicialize com um array vazio
  const [additionalData, setAdditionalData] = useState<number | null>(null);
  // const [loading, setLoading] = useState(false); // Novo estado para controle de carregamento

  const onSubmit = async (data: FormData) => {
    const selectedCrypto = data.crypto;
    const selectValue = data.amount;

    try {
      // setLoading(true); // Ativar o indicador de carregamento

      const response = await fetch(`/src/json/${selectedCrypto}.json`);
      const jsonData = await response.json();

      setResponseData(jsonData.data[selectedCrypto]);
      setAdditionalData(selectValue);
      toast.success("Adicionado com Sucesso");
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      // setLoading(false); // Desativar o indicador de carregamento, independentemente do resultado
    }
  };

  return (
    <>
      {/* {loading && <h1>Loading...</h1>} */}
      <ToastContainer />

      <div className="-translate-y-20 mobileLandscape:translate-y-5 flex justify-center flex-col w-full items-center min-h-screen">
        {/* Utiliza o componente do formulário aqui */}
        <CurrencyForm onSubmit={onSubmit} />
      </div>
      <div className="-translate-y-20 sm:-translate-y-1/4 lg:-translate-y-1/3 mobileLandscape:translate-y-0">
        <div className="max-w-2xl mx-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left">
                  Field
                </th>
                <th className="py-2 px-4 border-b border-gray-300 font-semibold text-left">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {responseData?.map((item, index) => (
                <>
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-300 font-semibold text-left">
                      Available Amount
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      {additionalData}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-300 font-semibold text-left">
                      Name
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      {item.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-300 font-semibold text-left">
                      Category
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      {item.category}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-300 font-semibold text-left">
                      Symbol
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      {item.symbol}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-300 font-semibold text-left">
                      Website
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      <a
                        href="https://bitcoin.org/"
                        className="text-blue-500 hover:underline"
                        target="_blank"
                      >
                        https://bitcoin.org/
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-300 font-semibold text-left">
                      Logo
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left w-3">
                      <img height={30} width={30} src={item.logo} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-300 font-semibold text-left">
                      Reddit
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      <a
                        href={item?.urls.reddit?.[0]}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                      >
                        {item?.urls.reddit?.[0]}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-300 font-semibold text-left">
                      Technical Documents
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      <a
                        href={item?.urls.technical_doc?.[0]}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                      >
                        {item?.urls.technical_doc?.[0]}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-300 font-semibold text-left">
                      Source Code
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-left">
                      <a
                        href={item.urls.source_code}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                      >
                        {item?.urls.source_code?.[0]}
                      </a>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyForm;
