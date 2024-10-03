// app/pages/api/generos/[id].js

import prisma from '../../../../lib/prisma'; // Importa a instância do Prisma

export default async function handler(req, res) {
  const { id } = req.query;
  const { method } = req;

  switch (method) {
    case 'PUT':
      // Atualizar o gênero pelo ID
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ error: 'Nome do gênero é obrigatório.' });
      }

      try {
        const generoAtualizado = await prisma.genero.update({
          where: { id: parseInt(id) },
          data: { nome },
        });
        return res.status(200).json(generoAtualizado);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao atualizar o gênero.' });
      }

    case 'DELETE':
      try {
        // Deletar o gênero pelo ID
        await prisma.genero.delete({
          where: { id: parseInt(id) },
        });
        return res.status(200).json({ message: 'Gênero deletado com sucesso!' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao deletar o gênero. Verifique se ele está associado a outros dados.' });
      }

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
