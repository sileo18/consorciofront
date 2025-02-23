"use client";

import axios from "axios";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
    cpf: z.string().length(11, "O Cpf deve conter 11 dígitos"),
    nome: z.string().min(1),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

type SchemaProps = z.infer<typeof validationSchema>;

export default function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<SchemaProps>({
        resolver: zodResolver(validationSchema)
      });

      const onSubmit: SubmitHandler<SchemaProps> = async (data, event) => {

        event?.preventDefault();

        try {
          const response = await axios.post('http://localhost:8080/auth/register', {
            cpf: data.cpf,
            nome: data.nome,
            email: data.email,
            senha: data.senha
          });
    
          // Handle the response as needed
          console.log('Response:', response.data);
        } catch (error) {
          // Handle error
          console.error('Error submitting form:', error);
        }
      };



    return (
        <div className='gap-1 flex text-left flex-col justify-center px-8 py-12 bg-white w-auto h-auto rounded-lg border-1 border-gray-400 '>
            <h2 className="text-gray-900 text-2xl font-extrabold">Cadastre-se</h2>
            <span className="text-gray-900 text-sm">Preencha seus dados para se cadastrar.</span>


            <form className="flex flex-col justify-start items-start py-2 w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="my-4 h-14 w-full">
                    <input
                        type="text"                        
                        placeholder="CPF"  
                        {...register("cpf")}                      
                        required
                        className="rounded-lg w-full h-full px-4 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.cpf && <span className="text-red-500">{errors.cpf.message}</span>}
                </div>
                <div className="my-4 h-14 w-full">
                    <input
                        type="text"                        
                        placeholder="Nome Completo"
                        {...register("nome")}                       
                        required
                        className="rounded-lg w-full h-full px-4 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
                </div>
                <div className="my-4 h-14 w-full">
                    <input
                        type="email"                        
                        placeholder="Email"
                        {...register("email")}
                        required
                        className="rounded-lg w-full h-full px-4 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                <div className="my-4 h-14 w-full">
                    <input
                        type="password"                        
                        placeholder="Senha"
                        {...register("senha")}
                        required
                        className="rounded-lg w-full h-full px-4 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.senha && <span className="text-red-500">{errors.senha.message}</span>}
                </div>
                <div className="my-4 h-14 w-full">
                    <button
                        type="submit"
                        className="text-gray-200 text-xl font-bold rounded-lg w-full h-full bg-blue-600 hover:bg-blue-400 transition duration-300"
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}


