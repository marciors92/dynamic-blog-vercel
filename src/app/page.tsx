// Importa componentes e bibliotecas necessárias
import Link from 'next/link';
import slugify from 'slugify';
import artigos from '@/data/artigos.json'; // O alias `@/` funciona com a configuração do tsconfig.json

// Componente de página inicial. É um Server Component por padrão.
export default async function PaginaInicial() {
  // Mapeia os artigos para adicionar um 'slug' (URL amigável) a cada um.
  const artigosComSlugs = artigos.map(artigo => ({
    ...artigo,
    slug: slugify(artigo.titulo, { lower: true, strict: true })
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Últimos Artigos</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Mapeia e renderiza um cartão para cada artigo */}
        {artigosComSlugs.map(artigo => (
          <div key={artigo.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{artigo.titulo}</h2>
              <p className="text-gray-600 text-sm mb-4">
                Por {artigo.autor} em {artigo.dataPublicacao}
              </p>
              <p className="text-gray-700 mb-4">{artigo.resumo}</p>
              {/* O Link aponta para a rota dinâmica do artigo */}
              <Link href={`/artigos/${artigo.slug}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Ler mais
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}