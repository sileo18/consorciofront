"use client";

import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface Grupo {
  id: string;
  codigo: string;
  admnistracaoPorcentagem: number;
  duracaoMeses: number;
}

interface Cota {
  id: string;
  codigo: string;
  categoria: number;
  credito: number;
  planoMeses: number;
  totalPago: number;
  parcela: number;
  grupo: Grupo;
}

type DataResponse = Cota[] | null;

export default function Dashboard() { 
  const [data, setData] = useState<DataResponse>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = Cookies.get("userId");
      const authToken = Cookies.get("authToken");

      console.log(userId, authToken)

      if (!userId || !authToken) {
        setError("Usuário não autenticado.");
        return;
      }

      try {
        const response = await axios.get<DataResponse>(`http://localhost:8080/cotas/usuario/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          withCredentials: true 
        });
        setData(response.data);
      } catch (err) {
        setError("Erro ao buscar dados.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      {error && <p>{error}</p>}
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <p>Código: {item.codigo}</p>
              <p>Categoria: {item.categoria}</p>
              <p>Crédito: {item.credito}</p>
              <p>Plano Meses: {item.planoMeses}</p>
              <p>Total Pago: {item.totalPago}</p>
              <p>Parcela: {item.parcela}</p>
              <div>
                <h4>Grupo:</h4>
                <p>ID: {item.grupo.id}</p>
                <p>Código: {item.grupo.codigo}</p>
                <p>Administração (%): {item.grupo.admnistracaoPorcentagem}</p>
                <p>Duração (meses): {item.grupo.duracaoMeses}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Carregando...</p>
      )}
    </main>
  );
}