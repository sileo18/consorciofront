"use client";
import axios from "axios";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from "js-cookie"; // Importando js-cookie
import { jwtDecode } from "jwt-decode";
import { UUID } from "crypto";

const validationSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
});

interface DataResponse {
  token: string,
  nome: string,
  id: string
}

type SchemaProps = z.infer<typeof validationSchema>;

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SchemaProps>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<SchemaProps> = async (data, event) => {
    event?.preventDefault();
    setLoadingLogin(true);

    try {
        const response = await axios.post<DataResponse>('http://localhost:8080/auth/login', {
            email: data.email,
            senha: data.senha
        }, {
          withCredentials: true
        }
      );

        const { token, nome, id } = response.data;
        
        Cookies.set("authToken", token, { expires: 1 });
        Cookies.set("userId", id, { path: '/' });

        //console.log(token, nome, id); 

        router.push('/dashboard');
    } catch (error) {
        setLoadingLogin(false);
        setErrorMessage("Erro ao fazer login. Verifique suas credenciais.");
    }
};

  const handleRedirectToRegister = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/register');
    }, 1000);
  };

  return (
    <div className='gap-1 flex text-left flex-col justify-center px-8 py-12 bg-white w-auto h-auto rounded-lg border-1 border-gray-400 '>
      <h2 className="text-gray-900 text-2xl font-extrabold">Acessar Conta</h2>
      <span className="text-gray-900 text-sm ">Preencha seus dados de acesso para continuar.</span>

      <form className="flex flex-col justify-start items-start py-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 h-14 w-full">
          <input
            type="text"
            placeholder="Email"
            {...register("email")}
            className="rounded-lg w-full h-full px-4 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div className="my-4 h-14 w-full">
          <input
            type="password"
            placeholder="Senha"
            {...register("senha")}
            className="rounded-lg w-full h-full px-4 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.senha && <span className="text-red-500">{errors.senha.message}</span>}
        </div>

        {errorMessage && <span className="text-red-500">{errorMessage}</span>}

        <div className="my-4 h-14 w-full">
          <button
            type="submit"
            disabled={loadingLogin}
            className="text-gray-200 text-xl font-bold rounded-lg w-full h-full bg-blue-600 hover:bg-blue-400 transition duration-300"
          >
            {loadingLogin ? 'Carregando...' : 'Login'}
          </button>
        </div>
      </form>

      <span className="text-gray-500 text-sm ">Ainda não possui uma conta?</span>
      <span
        className="text-blue-600 text-sm cursor-pointer hover:text-blue-400"
        onClick={handleRedirectToRegister}
      >
        {loading ? 'Redirecionando...' : 'Crie uma agora mesmo!'}
      </span>
    </div>
  );
}