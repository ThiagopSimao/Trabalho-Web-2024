// app/pages/api/generos/index.js

import prisma from '../../../../lib/prisma'; // Importa a instância do Prisma

// Função para lidar com as requisições
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Busca todos os gêneros
      const generos = await prisma.genero.findMany();
      res.status(200).json(generos);
      break;

    case 'POST':
      // Cria um novo gênero
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: 'Nome do gênero é obrigatório.' });
      }

      const novoGenero = await prisma.genero.create({
        data: { nome },
      });

      res.status(201).json(novoGenero);
      break;

    case 'DELETE':
      // Extrai o id do gênero da URL
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'ID do gênero é obrigatório.' });
      }

      try {
        // Verifica se o gênero existe antes de deletar
        const generoExistente = await prisma.genero.findUnique({
          where: { id: parseInt(id) }, // Certifique-se de que o id é um número
        });

        if (!generoExistente) {
          return res.status(404).json({ error: 'Gênero não encontrado' });
        }

       /* // Deleta o gênero
        await prisma.genero.delete({
          where: { id: parseInt(id) },
        });
*/
        return res.status(204).end(); // No Content
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao deletar o gênero.' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}