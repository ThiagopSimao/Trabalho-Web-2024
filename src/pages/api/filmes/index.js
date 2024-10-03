// import prisma from '../../../../lib/prisma'; // Importa a instância do Prisma
// import fetch from 'node-fetch'; // Adicione esta linha para permitir chamadas fetch

// const OMDB_API_KEY = '5336e0e5'; // Substitua pela sua chave da OMDB

// // Função para buscar filmes na OMDB API
// const fetchMovieFromOMDB = async (titulo) => {
//   const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${OMDB_API_KEY}`);
//   const data = await response.json();
//   return data;
// };

// // Função para lidar com as requisições
// export default async function handler(req, res) {
//   switch (req.method) {
//     case 'GET':
//       // Obtém os parâmetros de filtragem da query
//       const { titulo, lancamento, generoId, diretor } = req.query;

//       // Monta a condição de filtragem
//       const where = {
//         ...(titulo && { titulo: { contains: titulo, mode: 'insensitive' } }), // Filtra por título
//         ...(lancamento && { lancamento: { equals: new Date(lancamento) } }), // Filtra por data de lançamento
//         ...(generoId && { generoId: parseInt(generoId) }), // Filtra por gênero
//         ...(diretor && { diretor: { contains: diretor, mode: 'insensitive' } }), // Filtra por diretor
//       };

//       // Busca filmes com base nos filtros, se houver
//       const filmes = await prisma.filme.findMany({
//         where, // Aplica a condição de filtragem
//         include: {
//           genero: true, // Inclui os dados do gênero relacionado
//         },
//       });

//       res.status(200).json(filmes);
//       break;

//     case 'POST':
//       // Cria um novo filme
//       const { titulo: novoTitulo, lancamento: novoLancamento, generoId: novoGeneroId, diretor: novoDiretor } = req.body;

//       if (!novoTitulo || !novoLancamento || !novoGeneroId || !novoDiretor) {
//         return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
//       }

//       const novoFilme = await prisma.filme.create({
//         data: {
//           titulo: novoTitulo,
//           lancamento: novoLancamento,
//           genero: { connect: { id: parseInt(novoGeneroId) } }, // Conecta o gênero
//           diretor: novoDiretor,
//         },
//       });

//       res.status(201).json(novoFilme);
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'POST']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//       break;
//   }
// }

import prisma from '../../../../lib/prisma'; // Importa a instância do Prisma
import fetch from 'node-fetch'; // Adicione esta linha para permitir chamadas fetch

const OMDB_API_KEY = '5336e0e5'; 

// Função para buscar filmes na OMDB API
const fetchMovieFromOMDB = async (titulo) => {
  const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(titulo)}&apikey=${OMDB_API_KEY}`);
  const data = await response.json();
  return data;
};

// Função para lidar com as requisições
export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // Obtém os parâmetros de filtragem da query
      const { titulo, lancamento, generoId, diretor } = req.query;

      // Monta a condição de filtragem
      const where = {
        ...(titulo && { titulo: { contains: titulo, mode: 'insensitive' } }), // Filtra por título
        ...(lancamento && { lancamento: { equals: new Date(lancamento) } }), // Filtra por data de lançamento
        ...(generoId && { generoId: parseInt(generoId) }), // Filtra por gênero
        ...(diretor && { diretor: { contains: diretor, mode: 'insensitive' } }), // Filtra por diretor
      };

      // Busca filmes com base nos filtros, se houver
      const filmes = await prisma.filme.findMany({
        where, // Aplica a condição de filtragem
        include: {
          genero: true, // Inclui os dados do gênero relacionado
        },
      });

      res.status(200).json(filmes);
      break;

    case 'POST':
      // Cria um novo filme a partir da OMDB
      const { titulo: tituloBusca } = req.body; // Espera que o título do filme seja passado no corpo da requisição
      const movieData = await fetchMovieFromOMDB(tituloBusca);

      if (movieData.Response === 'False') {
        return res.status(404).json({ error: 'Filme não encontrado na OMDB.' });
      }

      // Adiciona o filme à base de dados
      const novoFilme = await prisma.filme.create({
        data: {
          titulo: movieData.Title,
          lancamento: movieData.Released,
          genero: { connect: { id: parseInt(movieData.Genre) } }, // Aqui pode ser necessário tratar os gêneros
          diretor: movieData.Director,
        },
      });

      res.status(201).json(novoFilme);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
