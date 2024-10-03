// app/layout.js

import './globals.css'; // Importe estilos globais se houver
import { Inter } from 'next/font/google'; // Exemplificando a importação de fonte do Google
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] }); // Usando a fonte importada

export const metadata = {
  title: 'Cadastro de Filmes',
  description: 'Aplicação para cadastro de gêneros e filmes usando Next.js e Prisma',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header className="p-4 bg-gray-800 text-white">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/01-generos" className="hover:underline">Gêneros</Link>
              </li>
              <li>
                <Link href="/02-filmes" className="hover:underline">Filmes</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="p-8">{children}</main>
        <footer className="p-4 bg-gray-800 text-white text-center">
          &copy; {new Date().getFullYear()} Cadastro de Filmes
        </footer>
      </body>
    </html>
  );
}
