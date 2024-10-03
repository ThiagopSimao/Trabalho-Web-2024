import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { titulo, generoId, diretor } = req.query;

  // Verificar se algum filtro foi passado
  const where = {
    ...(titulo && { titulo: { contains: titulo, mode: "insensitive" } }), // Filtra pelo título
    ...(generoId && { genero: { nome: { contains: generoId, mode: "insensitive" } } }), // Filtra pelo nome do gênero
    ...(diretor && { diretor: { contains: diretor, mode: "insensitive" } }) // Filtra pelo diretor
  };

  try {
    const filmes = await prisma.filme.findMany({
      where,
      include: { genero: true }, // Inclui o nome do gênero
    });

    res.status(200).json(filmes);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
}
