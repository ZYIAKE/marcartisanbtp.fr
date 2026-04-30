import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Marc Artisan BTP — Recrutement de sous-traitants tous corps d\'état',
  description: 'Marc Artisan BTP, entreprise de bâtiment qui recrute des artisans en sous-traitance. Maçons, plaquistes, électriciens, plombiers, peintres et plus. Postulez en ligne.',
  keywords: 'sous-traitance BTP, artisan BTP, recrutement artisan, maçon, plaquiste, électricien, plombier, peintre, carreleur, chantier sous-traitance',
  metadataBase: new URL('https://marcartisanbtp.fr'),
  openGraph: {
    title: 'Marc Artisan BTP — Recrutement sous-traitants',
    description: 'Entreprise BTP qui recrute des sous-traitants déclarés sur la France entière.',
    url: 'https://marcartisanbtp.fr',
    siteName: 'Marc Artisan BTP',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-stone-50 text-stone-900 font-sans">{children}</body>
    </html>
  );
}
