// app/pages/api/filmes/.js

import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'PUT':
      const { titulo, lancamento, generoId, diretor } = req.body;

      if (!titulo || !lancamento || !generoId || !diretor) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      try {
        const filmeAtualizado = await prisma.filme.update({
          where: { id: parseInt(id) },
          data: {
            titulo,
            lancamento,
            generoId: parseInt(generoId),
            diretor,
          },
        });

        res.status(200).json(filmeAtualizado);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o filme.' });
      }
      break;

    case 'DELETE':
      try {
        // Deletar o filme pelo ID
        await prisma.filme.delete({
          where: { id: parseInt(id) },
        });
        return res.status(200).json({ message: 'Filme deletado com sucesso!' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao deletar o filme.' });
      }

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
