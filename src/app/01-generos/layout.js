// app/01-generos/layout.js

export default function GenerosLayout({ children }) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="p-4 bg-gray-800 text-white">
          <h1 className="text-2xl font-bold">Gerenciamento de Gêneros</h1>
        </header>
        <main className="flex-grow p-8">
          {children}
        </main>
        <footer className="p-4 bg-gray-800 text-white text-center">
          &copy; {new Date().getFullYear()} Meu Projeto de Filmes
        </footer>
      </div>
    );
  }
  