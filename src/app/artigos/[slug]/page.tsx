// Importa os dados, utilitários e componentes necessários
import artigos from '@/data/artigos.json';
import slugify from 'slugify';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Função para gerar os parâmetros de rotas estáticas.
// O Next.js a executa no momento do build (SSG).
export async function generateStaticParams() {
  const slugs = artigos.map(artigo => ({
    // Retorna um objeto com a chave 'slug' para cada artigo
    slug: slugify(artigo.titulo, { lower: true, strict: true })
  }));
  return slugs;
}

// Função para gerar metadados dinâmicos para SEO.
// Também é executada no momento do build.
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Encontra o artigo correspondente ao 'slug' da URL
  const artigo = artigos.find(a => slugify(a.titulo, { lower: true, strict: true }) === params.slug);

  // Se não encontrar, retorna metadados de 'não encontrado'
  if (!artigo) {
    return {
      title: 'Artigo não encontrado',
      description: 'A página que você procura não existe.'
    };
  }

  // Retorna os metadados dinâmicos, usando os dados do artigo
  return {
    title: `${artigo.titulo} | Blog Next.js`,
    description: artigo.resumo
  };
}

// O componente da página do artigo. É um Server Component.
export default async function PaginaArtigo({ params }: { params: { slug: string } }) {
  // Encontra o artigo para exibir seu conteúdo
  const artigo = artigos.find(a => slugify(a.titulo, { lower: true, strict: true }) === params.slug);

  // Se o artigo não for encontrado, exibe a página 404
  if (!artigo) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{artigo.titulo}</h1>
        <p className="text-gray-600 text-sm mb-6">
          Por {artigo.autor} em {artigo.dataPublicacao}
        </p>
        
        <div className="prose max-w-none text-lg leading-relaxed">
          {/* Exibe o conteúdo completo do artigo */}
          <p>{artigo.conteudo}</p>
        </div>
      </article>
    </div>
  );
}