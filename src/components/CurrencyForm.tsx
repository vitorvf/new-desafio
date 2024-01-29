import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IAppProps {
  onSubmit: (data: IFormInput) => void;
}

interface IFormInput {
  amount: number;
  crypto: string;
}

const schema = yup
  .object({
    amount: yup
      .number()
      .required("Amount is required!")
      .typeError("O valor deve ser numérico!")
      .positive("O valor deve ser um número positivo!")
      .integer("O valor deve ser um numero inteiro!")
      .required("Amount is required!"),
    crypto: yup.string().required("Currency is required!"),
  })
  .required();

export default function App({ onSubmit }: IAppProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  return (
    <form
      className="flex flex-col justify-center max-w-xl w-full p-4 space-y-4 isolate aspect-video rounded-xl bg-white brightness-95 shadow-md ring-1 ring-black/5 py-12 px-16"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="block text-gray-800 gray-700 text-sm font-bold mb-3">
        Amount:
      </label>

      <input
        data-testid="amount-form"
        className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline isolate  bg-white/20 ring-1 ring-black/5 border-slate-300"
        {...register("amount")}
      />
      <p className="text-red-600 mt-1.5 ms-2 -mb-3">{errors.amount?.message}</p>

      <label className="block text-gray-800 gray-700 text-sm font-bold mb-3">
        Currency:
      </label>
      <select
        className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline isolate  bg-white/20 ring-1 ring-black/5 border-slate-300"
        {...register("crypto")}
      >
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        <option value="USDT">USDT</option>
        <option value="XMR">XMR</option>
        <option value="ZEC">ZEC</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Add Crypto Asset
      </button>
    </form>
  );
}
