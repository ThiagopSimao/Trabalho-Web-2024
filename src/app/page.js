
"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [filtros, setFiltros] = useState({
    titulo: "",
    generoId: "",
    diretor: "",
  });

  // Função para buscar os filmes com base nos filtros
  const fetchFilmes = async () => {
    const query = new URLSearchParams(filtros).toString();
    const response = await fetch(`/api/filmes?${query}`);
    const data = await response.json();
    setFilmes(data);
  };

  // Função para buscar os gêneros
  const fetchGeneros = async () => {
    const response = await fetch("/api/generos");
    const data = await response.json();
    setGeneros(data);
  };

  // Chamada para buscar os gêneros ao carregar a página
  useEffect(() => {
    fetchGeneros();
  }, []);

  // Função para atualizar os filtros
  const handleInputChange = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value,
    });
  };

  // Função para submeter a busca
  const handleSearch = (e) => {
    e.preventDefault();
    fetchFilmes();
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 min-w-full bg-white">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Filmes</h1>
      <div className="flex justify-center gap-4 w-full">
        <ClassCard label="Cadastro de Gêneros" href="/01-generos" />
        <ClassCard label="Cadastro de Filmes" href="/02-filmes" />
      </div>

      {/* Formulário de busca */}
      <form onSubmit={handleSearch} className="mt-8 w-full max-w-lg">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="titulo"
            value={filtros.titulo}
            onChange={handleInputChange}
            placeholder="Buscar por título"
            className="border p-2"
          />
          <select
            name="generoId"
            value={filtros.generoId}
            onChange={handleInputChange}
            className="border p-2"
          >
            <option value="">Todos os Gêneros</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="diretor"
            value={filtros.diretor}
            onChange={handleInputChange}
            placeholder="Buscar por diretor"
            className="border p-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
        >
          Buscar
        </button>
      </form>

      {/* Exibindo os filmes em uma grid */}
      {filmes.length > 0 && (
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-bold mb-4">Resultados da Busca</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Título</th>
                <th className="border p-2">Data de Lançamento</th>
                <th className="border p-2">Gênero</th>
                <th className="border p-2">Diretor</th>
              </tr>
            </thead>
            <tbody>
              {filmes.map((filme) => (
                <tr key={filme.id}>
                  <td className="border p-2">{filme.titulo}</td>
                  <td className="border p-2">{filme.lancamento}</td>
                  <td className="border p-2">{filme.genero?.nome}</td>
                  <td className="border p-2">{filme.diretor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

// O componente ClassCard pode ser importado aqui ou definido no mesmo arquivo
function ClassCard({ label, href }) {
  return (
    <a
      href={href}
      className="hover:bg-slate-300 hover:border-gray-400 col-span-1 border border-gray-400 bg-gray-300 h-24 rounded-md shadow-lg items-center flex justify-center m-2 flex-col shadow-blue-300 p-2 text-center"
    >
      <span className="text-blue-950 font-bold text-lg">{label}</span>
    </a>
  );
}

