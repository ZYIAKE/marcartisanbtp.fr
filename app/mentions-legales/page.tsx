import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-stone-600 hover:text-brand-500 inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
        </div>
      </header>
      <article className="max-w-3xl mx-auto px-4 py-10 prose prose-stone">
        <h1 className="text-3xl font-extrabold mb-6">Mentions légales</h1>

        <h2 className="text-xl font-bold mt-6 mb-2">Éditeur</h2>
        <p>
          Marc Artisan BTP — entreprise du bâtiment.<br />
          Adresse postale : 69 rue de Belbèze, 31170 Tournefeuille, France<br />
          Email : contact@marcartisanbtp.fr
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">Hébergement</h2>
        <p>
          Site hébergé par Cloudflare Inc., 101 Townsend St, San Francisco, CA 94107, USA.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">Données personnelles</h2>
        <p>
          Les données personnelles collectées via le formulaire de candidature
          (prénom, nom, email, téléphone, métier, ville, message) sont utilisées
          uniquement pour traiter votre candidature de sous-traitance.
        </p>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
          de suppression et d&apos;opposition concernant vos données. Pour exercer ces
          droits, contactez-nous à <strong>contact@marcartisanbtp.fr</strong>.
        </p>
        <p>
          Durée de conservation : 12 mois après réception de la candidature, sauf
          si vous demandez la suppression avant.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-2">Cookies</h2>
        <p>Aucun cookie de tracking sur ce site.</p>
      </article>
    </main>
  );
}
