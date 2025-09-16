// O layout é um componente que envolve todas as páginas, como um template.
import './globals.css';
import Link from 'next/link';

// Metadados estáticos para todo o site. Aparecem em todas as páginas.
export const metadata = {
  title: 'Blog Next.js',
  description: 'Um blog simples e robusto construído com o Next.js App Router.'
};

// Componente de layout principal
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Componente de cabeçalho. Fica visível em todas as páginas. */}
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            {/* Link que leva para a página inicial */}
            <Link href="/" className="text-2xl font-bold hover:text-gray-300">
              Blog App Router
            </Link>
          </nav>
        </header>

        {/* 'children' é a página atual que está sendo renderizada (a página inicial ou a página de artigo) */}
        <main className="min-h-screen bg-gray-100 py-8">{children}</main>

        {/* Componente de rodapé. Fica visível em todas as páginas. */}
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; {new Date().getFullYear()} Blog App Router. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}