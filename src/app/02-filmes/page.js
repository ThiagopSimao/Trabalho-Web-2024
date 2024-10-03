// // app/02-filmes/page.js
// "use client";

// import { useState, useEffect } from 'react';

// export default function FilmesPage() {
//   const [filmes, setFilmes] = useState([]);
//   const [generos, setGeneros] = useState([]);
//   const [novoFilme, setNovoFilme] = useState({ titulo: '', lancamento: '', generoId: '', diretor: '' });
//   const [filtros, setFiltros] = useState({ titulo: '', lancamento: '', generoId: '', diretor: '' }); // Estado para filtros
//   const [filmeEditando, setFilmeEditando] = useState(null);

//   // Função para buscar filmes do backend
//   /*const fetchFilmes = async () => {
//     const response = await fetch('/api/filmes');
//     const data = await response.json();
//     setFilmes(data);
//   };
// */
//  // Função para buscar filmes com base nos filtros
//  const fetchFilmes = async () => {
//   const queryString = new URLSearchParams(filtros).toString();
//   const response = await fetch(`/api/filmes?${queryString}`);
//   const data = await response.json();
//   setFilmes(data);
// };

//   // Função para buscar gêneros do backend
//   const fetchGeneros = async () => {
//     const response = await fetch('/api/generos');
//     const data = await response.json();
//     setGeneros(data);
//   };

//   // Função para adicionar ou atualizar um filme
//   const salvarFilme = async (e) => {
//     e.preventDefault();
//     if (!novoFilme.titulo || !novoFilme.lancamento || !novoFilme.generoId || !novoFilme.diretor) return;

//     if (filmeEditando) {
//       // Atualizar filme existente
//       await fetch(`/api/filmes/${filmeEditando}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(novoFilme),
//       });
//       setFilmeEditando(null); // Limpa a edição após salvar
//     } else {
//       // Adicionar novo filme
//       await fetch('/api/filmes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(novoFilme),
//       });
//     }

//     setNovoFilme({ titulo: '', lancamento: '', generoId: '', diretor: '' }); // Limpa os campos
//     fetchFilmes(); // Atualiza a lista de filmes
//   };

//   // Função para deletar um filme
//   const deletarFilme = async (id) => {
//     await fetch(`/api/filmes/${id}`, {
//       method: 'DELETE',
//     });
//     fetchFilmes(); // Atualiza a lista de filmes
//   };

//   // Função para iniciar a edição de um filme
//   const editarFilme = (filme) => {
//     setNovoFilme({
//       titulo: filme.titulo,
//       lancamento: filme.lancamento,
//       generoId: filme.generoId,
//       diretor: filme.diretor,
//     });
//     setFilmeEditando(filme.id); // Armazena o ID do filme que está sendo editado
//   };

//   // UseEffect para buscar filmes e gêneros ao carregar a página
//   useEffect(() => {
//     fetchFilmes();
//     fetchGeneros();
//   }, []);

//   // Função para lidar com mudanças nos filtros
//   const handleFilterChange = (e) => {
//     setFiltros({ ...filtros, [e.target.name]: e.target.value });
//   };

//    // Função para aplicar os filtros
//    const aplicarFiltros = (e) => {
//     e.preventDefault();
//     fetchFilmes();
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Cadastrar Filme</h2>

//       <form onSubmit={salvarFilme} className="mb-4">
//         <input
//           type="text"
//           value={novoFilme.titulo}
//           onChange={(e) => setNovoFilme({ ...novoFilme, titulo: e.target.value })}
//           placeholder="Título"
//           className="border p-2 mr-2"
//           required
//         />
//         <input
//           type="date"
//           value={novoFilme.lancamento}
//           onChange={(e) => setNovoFilme({ ...novoFilme, lancamento: e.target.value })}
//           className="border p-2 mr-2"
//           required
//         />
//         <select
//           value={novoFilme.generoId}
//           onChange={(e) => setNovoFilme({ ...novoFilme, generoId: e.target.value })}
//           className="border p-2 mr-2"
//           required
//         >
//           <option value="">Selecione um gênero</option>
//           {generos.map((genero) => (
//             <option key={genero.id} value={genero.id}>{genero.nome}</option>
//           ))}
//         </select>
//         <input
//           type="text"
//           value={novoFilme.diretor}
//           onChange={(e) => setNovoFilme({ ...novoFilme, diretor: e.target.value })}
//           placeholder="Diretor"
//           className="border p-2 mr-2"
//           required
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           {filmeEditando ? 'Atualizar' : 'Adicionar'}
//         </button>
//       </form>

//       <h2 className="text-2xl font-bold mb-4">Filtrar Filmes</h2>
//       <form onSubmit={aplicarFiltros} className="mb-4">
//         <input
//           type="text"
//           name="titulo"
//           value={filtros.titulo}
//           onChange={handleFilterChange}
//           placeholder="Título"
//           className="border p-2 mr-2"
//         />
//         <input
//           type="date"
//           name="lancamento"
//           value={filtros.lancamento}
//           onChange={handleFilterChange}
//           className="border p-2 mr-2"
//         />
//         <select
//           name="generoId"
//           value={filtros.generoId}
//           onChange={handleFilterChange}
//           className="border p-2 mr-2"
//         >
//           <option value="">Selecione um gênero</option>
//           {generos.map((genero) => (
//             <option key={genero.id} value={genero.id}>
//               {genero.nome}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           name="diretor"
//           value={filtros.diretor}
//           onChange={handleFilterChange}
//           placeholder="Diretor"
//           className="border p-2 mr-2"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Aplicar Filtros
//         </button>
//       </form>




//       <h2 className="text-2xl font-bold mb-4">Lista de Filmes</h2>
      
      
//       <table className="table-auto w-full mb-4 border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-200 p-2">Título</th>
//             <th className="border border-gray-200 p-2">Data de Lançamento</th>
//             <th className="border border-gray-200 p-2">Gênero</th>
//             <th className="border border-gray-200 p-2">Diretor</th>
//             <th className="border border-gray-200 p-2">Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filmes.map((filme) => (
//             <tr key={filme.id} className="hover:bg-gray-50">
//               <td className="border border-gray-200 p-2">{filme.titulo}</td>
//               <td className="border border-gray-200 p-2">{new Date(filme.lancamento).toLocaleDateString()}</td>
//               <td className="border border-gray-200 p-2">{filme.genero.nome}</td>
//               <td className="border border-gray-200 p-2">{filme.diretor}</td>
//               <td className="border border-gray-200 p-2">
//                 <button 
//                   onClick={() => editarFilme(filme)}
//                   className="bg-yellow-500 text-white p-1 rounded mr-2 justify-center"
//                 >
//                   Editar
//                 </button>
//                 <button
//                   onClick={() => deletarFilme(filme.id)}
//                   className="bg-red-500 text-white p-1 rounded justify-center"
//                 >
//                   Deletar
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {filmes.length === 0 && (
//         <p className="text-center text-gray-500">Nenhum filme cadastrado.</p>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from 'react';

export default function FilmesPage() {
  const [filmes, setFilmes] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [novoFilme, setNovoFilme] = useState({ titulo: '', lancamento: '', generoId: '', diretor: '' });
  const [filtros, setFiltros] = useState({ titulo: '', lancamento: '', generoId: '', diretor: '' });
  const [filmeEditando, setFilmeEditando] = useState(null);
  const [tituloBusca, setTituloBusca] = useState(''); // Estado para o título da busca

  const fetchFilmes = async () => {
    const queryString = new URLSearchParams(filtros).toString();
    const response = await fetch(`/api/filmes?${queryString}`);
    const data = await response.json();
    setFilmes(data);
  };

  const fetchGeneros = async () => {
    const response = await fetch('/api/generos');
    const data = await response.json();
    setGeneros(data);
  };

  const salvarFilme = async (e) => {
    e.preventDefault();
    if (!novoFilme.titulo || !novoFilme.lancamento || !novoFilme.generoId || !novoFilme.diretor) return;

    if (filmeEditando) {
      await fetch(`/api/filmes/${filmeEditando}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoFilme),
      });
      setFilmeEditando(null);
    } else {
      await fetch('/api/filmes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoFilme),
      });
    }

    setNovoFilme({ titulo: '', lancamento: '', generoId: '', diretor: '' });
    fetchFilmes();
  };

  const deletarFilme = async (id) => {
    await fetch(`/api/filmes/${id}`, {
      method: 'DELETE',
    });
    fetchFilmes();
  };

  const editarFilme = (filme) => {
    setNovoFilme({
      titulo: filme.titulo,
      lancamento: filme.lancamento,
      generoId: filme.generoId,
      diretor: filme.diretor,
    });
    setFilmeEditando(filme.id);
  };

  useEffect(() => {
    fetchFilmes();
    fetchGeneros();
  }, []);

  const handleFilterChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const aplicarFiltros = (e) => {
    e.preventDefault();
    fetchFilmes();
  };

  // Função para adicionar filme da OMDB
  const adicionarFilmeOMDB = async () => {
    if (!tituloBusca) return;

    const response = await fetch('/api/filmes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo: tituloBusca }),
    });

    if (response.ok) {
      fetchFilmes(); // Atualiza a lista de filmes após adicionar
    } else {
      const errorData = await response.json();
      alert(errorData.error); // Exibe mensagem de erro se o filme não for encontrado
    }

    setTituloBusca(''); // Limpa o campo de busca
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cadastrar Filme</h2>

      <form onSubmit={salvarFilme} className="mb-4">
        <input
          type="text"
          value={novoFilme.titulo}
          onChange={(e) => setNovoFilme({ ...novoFilme, titulo: e.target.value })}
          placeholder="Título"
          className="border p-2 mr-2"
          required
        />
        <input
          type="date"
          value={novoFilme.lancamento}
          onChange={(e) => setNovoFilme({ ...novoFilme, lancamento: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <select
          value={novoFilme.generoId}
          onChange={(e) => setNovoFilme({ ...novoFilme, generoId: e.target.value })}
          className="border p-2 mr-2"
          required
        >
          <option value="">Selecione um gênero</option>
          {generos.map((genero) => (
            <option key={genero.id} value={genero.id}>{genero.nome}</option>
          ))}
        </select>
        <input
          type="text"
          value={novoFilme.diretor}
          onChange={(e) => setNovoFilme({ ...novoFilme, diretor: e.target.value })}
          placeholder="Diretor"
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {filmeEditando ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>

      {/* Seção para buscar e adicionar filme da OMDB */}
      <h2 className="text-2xl font-bold mb-4">Adicionar Filme da OMDB</h2>
      <input
        type="text"
        value={tituloBusca}
        onChange={(e) => setTituloBusca(e.target.value)}
        placeholder="Buscar filme pela OMDB"
        className="border p-2 mr-2"
      />
      <button onClick={adicionarFilmeOMDB} className="bg-green-500 text-white p-2 rounded">
        Adicionar da OMDB
      </button>

      <h2 className="text-2xl font-bold mb-4">Filtrar Filmes</h2>
      <form onSubmit={aplicarFiltros} className="mb-4">
        <input
          type="text"
          name="titulo"
          value={filtros.titulo}
          onChange={handleFilterChange}
          placeholder="Título"
          className="border p-2 mr-2"
        />
        <input
          type="date"
          name="lancamento"
          value={filtros.lancamento}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        />
        <select
          name="generoId"
          value={filtros.generoId}
          onChange={handleFilterChange}
          className="border p-2 mr-2"
        >
          <option value="">Selecione um gênero</option>
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
          onChange={handleFilterChange}
          placeholder="Diretor"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Aplicar Filtros
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Lista de Filmes</h2>

      <table className="table-auto w-full mb-4 border-collapse border border-gray-200">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-gray-200 p-2">Título</th>
      <th className="border border-gray-200 p-2">Data de Lançamento</th>
      <th className="border border-gray-200 p-2">Gênero</th>
      <th className="border border-gray-200 p-2">Diretor</th>
      <th className="border border-gray-200 p-2">Ações</th>
    </tr>
  </thead>
  <tbody>
    {filmes.map((filme) => (
      <tr key={filme.id} className="hover:bg-gray-50">
        <td className="border border-gray-200 p-2">{filme.titulo}</td>
        <td className="border border-gray-200 p-2">{new Date(filme.lancamento).toLocaleDateString()}</td>
        <td className="border border-gray-200 p-2">{filme.genero.nome}</td>
        <td className="border border-gray-200 p-2">{filme.diretor}</td>
        <td className="border border-gray-200 p-2">
          <button 
            onClick={() => editarFilme(filme)}
            className="bg-yellow-500 text-white p-1 rounded mr-2"
          >
            Editar
          </button>
          <button 
            onClick={() => deletarFilme(filme.id)}
            className="bg-red-500 text-white p-1 rounded"
          >
            Deletar
          </button>
        </td>
      </tr>
      
    ))}
  </tbody>
</table>
</div>
)
}