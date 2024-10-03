"use client";

import { useState, useEffect } from 'react';

export default function GenerosPage() {
  const [generos, setGeneros] = useState([]);
  const [novoGenero, setNovoGenero] = useState('');
  const [editandoId, setEditandoId] = useState(null); // Estado para armazenar o ID do gênero em edição
  const [filtroGenero, setFiltroGenero] = useState(''); // Estado para armazenar o termo de busca

  // busca genero backend
  const fetchGeneros = async () => {
    const response = await fetch('/api/generos');
    const data = await response.json();
    setGeneros(data);
  };

  // adiciona ou atualiza genero
  const salvarGenero = async (e) => {
    e.preventDefault();

    if (!novoGenero) return;

    if (editandoId) {
      // Atualizar gênero existente
      await fetch(`/api/generos/${editandoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: novoGenero }),
      });
    } else {
      // Adicionar novo gênero
      await fetch('/api/generos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: novoGenero }),
      });
    }

    setNovoGenero(''); // Limpa o campo de entrada
    setEditandoId(null); // Reseta o estado de edição
    fetchGeneros(); // Atualiza a lista de generos
  };

  // Função para iniciar a edição de um gênero
  const editarGenero = (genero) => {
    setNovoGenero(genero.nome); // Preenche o input com o nome do gênero
    setEditandoId(genero.id); // Define o ID do gênero em edição
  };

  // função deleta genero
  const deletarGenero = async (id) => {
    await fetch(`/api/generos/${id}`, {
      method: 'DELETE',
    });
    fetchGeneros(); // atualiza lista de generos
  };

  // UseEffect para buscar gêneros ao carregar a página
  useEffect(() => {
    fetchGeneros();
  }, []);

  // Filtrar gêneros com base no termo de busca
  const generosFiltrados = generos.filter((genero) =>
    genero.nome.toLowerCase().includes(filtroGenero.toLowerCase())
  );

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">
        {editandoId ? 'Editar Gênero' : 'Cadastrar Gênero'}
      </h2>
      <form onSubmit={salvarGenero} className="mb-4 flex flex-col md:flex-row items-start md:items-center">
        <input
          type="text"
          value={novoGenero}
          onChange={(e) => setNovoGenero(e.target.value)}
          placeholder="Nome do Gênero"
          className="border p-2 mr-2 mb-2 md:mb-0"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editandoId ? 'Atualizar' : 'Adicionar'}
        </button>
        {editandoId && (
          <button
            onClick={() => {
              setNovoGenero(''); // Limpa o campo
              setEditandoId(null); // Cancela a edição
            }}
            className="bg-gray-500 text-white p-2 rounded ml-2"
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Filtro de consulta de gêneros */}
      <div className="mb-4">
        <input
          type="text"
          value={filtroGenero}
          onChange={(e) => setFiltroGenero(e.target.value)}
          placeholder="Consultar Gênero"
          className="border p-2"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">Lista de Gêneros</h2>

      {/* Tabela de Gêneros */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-2 text-left border-b bg-gray-100 font-semibold text-gray-700">
                Gênero
              </th>
              <th className="px-6 py-2 text-right border-b bg-gray-100 font-semibold text-gray-700">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {generosFiltrados.length > 0 ? (
              generosFiltrados.map((genero) => (
                <tr key={genero.id}>
                  <td className="px-6 py-4 border-b">{genero.nome}</td>
                  <td className="px-6 py-4 border-b flex justify-end space-x-2">
                    <button
                      onClick={() => editarGenero(genero)}
                      className="bg-yellow-500 text-white p-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletarGenero(genero.id)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 border-b" colSpan="2">
                  Nenhum gênero encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
