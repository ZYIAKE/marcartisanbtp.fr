import Link from 'next/link';
import {
  HardHat, ArrowRight, CheckCircle2, AlertTriangle, Hammer, Building2,
  Users, ShieldCheck, Mail, MapPin,
} from 'lucide-react';

const TRADES = [
  'Maçonnerie', 'Plaquiste', 'Électricité', 'Plomberie',
  'Chauffage', 'Carrelage', 'Peinture', 'Menuiserie',
  'Couvreur', 'Façadier', 'Étanchéité', 'Isolation',
  'Charpente', 'Vitrerie', 'Serrurerie', 'Parquet',
];

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative bg-stone-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-32">
          <div className="inline-flex items-center gap-2 bg-brand-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" /> Recrutement en cours — sous-traitance
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6">
            Marc Artisan BTP recrute des
            <span className="block text-brand-500">sous-traitants tous corps d&apos;état</span>
          </h1>
          <p className="text-xl text-stone-300 mb-8 max-w-2xl leading-relaxed">
            Notre entreprise BTP prend des chantiers en France entière et recherche des artisans
            sérieux et déclarés pour les compléter en sous-traitance régulière.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/postuler"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-3.5 rounded-lg text-base transition-colors"
            >
              Postuler maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#metiers"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-medium px-6 py-3.5 rounded-lg text-base transition-colors border border-white/20"
            >
              Voir les métiers recherchés
            </Link>
          </div>
        </div>
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <Stat icon={Building2} value="20-30" label="devis signés / mois" />
          <Stat icon={HardHat} value="16+" label="métiers recherchés" />
          <Stat icon={Users} value="0%" label="travail au noir" />
          <Stat icon={ShieldCheck} value="100%" label="paiement régulier" />
        </div>
      </section>

      {/* MÉTIERS RECHERCHÉS */}
      <section id="metiers" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
            Métiers recherchés
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Tous corps d&apos;état du bâtiment. Nous travaillons avec vous sur des chantiers de
            rénovation, construction neuve, lots de pavillons et locaux commerciaux.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TRADES.map((t) => (
            <div
              key={t}
              className="bg-white border border-stone-200 rounded-lg p-4 text-center hover:border-brand-500 hover:shadow-md transition-all"
            >
              <Hammer className="w-6 h-6 text-brand-500 mx-auto mb-2" />
              <p className="font-semibold text-sm">{t}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-stone-500 mt-6 italic">
          Vous exercez un autre métier du bâtiment ? Postulez quand même, on étudiera votre profil.
        </p>
      </section>

      {/* CONDITIONS */}
      <section className="bg-stone-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
              Nos conditions
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Pas de prise de tête, juste du sérieux des deux côtés.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Condition
              icon={ShieldCheck}
              title="Travail déclaré uniquement"
              text="Vous devez être bien déclaré (auto-entrepreneur, EI, EURL, SARL…). Nous ne faisons pas de travail au noir, c'est non-négociable."
            />
            <Condition
              icon={CheckCircle2}
              title="Paiement régulier"
              text="Règlement à l'heure ou à la tâche selon ce qui arrange tout le monde. Pas de retard, pas de discussion."
            />
            <Condition
              icon={Hammer}
              title="Vous faites le taf, vous êtes payé"
              text="Pas de remarques, pas d'embrouille. Si le chantier est fait dans les règles, vous êtes payé sans discuter."
            />
            <Condition
              icon={Users}
              title="Chantier régulier ou ponctuel"
              text="On peut vous appeler pour 1 chantier ou bosser ensemble sur le long terme. Vous gardez votre indépendance."
            />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-brand-500 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Prêt à bosser ensemble ?
          </h2>
          <p className="text-lg text-brand-50 mb-8">
            Remplissez le formulaire en 2 minutes. Réponse sous 24h.
          </p>
          <Link
            href="/postuler"
            className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-stone-100 font-bold px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Postuler maintenant
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-300 py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3 text-white">
              <HardHat className="w-5 h-5 text-brand-500" />
              <span className="font-bold text-lg">Marc Artisan BTP</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Entreprise de bâtiment qui prend des chantiers et recrute des artisans en
              sous-traitance partout en France.
            </p>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">Contact</p>
            <p className="flex items-center gap-2 text-xs">
              <Mail className="w-4 h-4 text-brand-500" /> contact@marcartisanbtp.fr
            </p>
            <p className="flex items-center gap-2 text-xs mt-2">
              <MapPin className="w-4 h-4 text-brand-500" /> France entière
            </p>
          </div>
          <div>
            <p className="text-white font-semibold mb-2">Liens</p>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/postuler" className="hover:text-brand-500">Postuler</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-brand-500">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-stone-800 text-xs text-stone-500 text-center">
          © {new Date().getFullYear()} Marc Artisan BTP. Tous droits réservés.
        </div>
      </footer>
    </main>
  );
}

function Stat({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) {
  return (
    <div>
      <Icon className="w-6 h-6 text-brand-500 mx-auto mb-2" />
      <p className="text-3xl sm:text-4xl font-extrabold">{value}</p>
      <p className="text-stone-500 text-xs mt-1 uppercase tracking-wide">{label}</p>
    </div>
  );
}

function Condition({ icon: Icon, title, text }: { icon: React.ElementType; title: string; text: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-stone-200">
      <Icon className="w-8 h-8 text-brand-500 mb-3" />
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-stone-600 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
