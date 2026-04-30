'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, Loader2, HardHat, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';

const POLLEN_API = 'https://atschgnbsrvswavtzeut.supabase.co/functions/v1/marc-confirm-relation';
const POLLEN_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0c2NoZ25ic3J2c3dhdnR6ZXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0ODIyMTgsImV4cCI6MjA5MzA1ODIxOH0.M2V9iqpYw1oz-a3F95N5LJIXkaFk8n4sxkHaddGdjVs';

interface LeadInfo {
  valid: boolean;
  contact_name: string;
  metier: string;
  ville: string;
  already_responded?: boolean;
  response?: string;
}

function RelationContent() {
  const search = useSearchParams();
  const token = search.get('token') || '';
  const queryReponse = search.get('reponse');

  const [info, setInfo] = useState<LeadInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState<'oui' | 'non' | null>(null);
  const [done, setDone] = useState<'oui' | 'non' | null>(null);

  useEffect(() => {
    if (!token) { setError('Token manquant.'); setLoading(false); return; }
    fetch(`${POLLEN_API}?token=${encodeURIComponent(token)}`, {
      headers: { Authorization: `Bearer ${POLLEN_ANON}`, apikey: POLLEN_ANON },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setInfo(d as LeadInfo);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Erreur'))
      .finally(() => setLoading(false));
  }, [token]);

  // Si on arrive avec ?reponse=oui|non depuis l'email, on confirme automatiquement
  useEffect(() => {
    if (!info || !info.valid || info.already_responded || done || submitting) return;
    if (queryReponse === 'oui' || queryReponse === 'non') {
      const t = setTimeout(() => handleResponse(queryReponse as 'oui' | 'non'), 800);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, queryReponse]);

  async function handleResponse(reponse: 'oui' | 'non') {
    setSubmitting(reponse);
    setError('');
    try {
      const res = await fetch(`${POLLEN_API}?token=${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${POLLEN_ANON}`,
          apikey: POLLEN_ANON,
        },
        body: JSON.stringify({ reponse }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setDone(reponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi');
    } finally {
      setSubmitting(null);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="flex items-center gap-3 text-stone-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          Chargement…
        </div>
      </main>
    );
  }

  if (error || !info?.valid) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h1 className="text-xl font-bold mb-2">Lien invalide ou expiré</h1>
          <p className="text-stone-600 mb-5">{error || 'Ce lien n\'est plus valable.'}</p>
          <Link href="/" className="text-brand-500 hover:underline text-sm inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    );
  }

  if (info.already_responded || done) {
    const finalResp = done || (info.response === 'yes' ? 'oui' : info.response === 'no' ? 'non' : null);
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          {finalResp === 'oui' ? (
            <>
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h1 className="text-2xl font-extrabold mb-3">C&apos;est noté !</h1>
              <p className="text-stone-600 leading-relaxed">
                J&apos;ai transmis votre profil à mon apporteur d&apos;affaires.
                <br /><br />
                <strong>Son équipe va vous contacter très prochainement</strong> par email ou téléphone.
                Vous n&apos;avez plus rien à faire.
              </p>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-16 h-16 text-stone-400 mx-auto mb-4" />
              <h1 className="text-2xl font-extrabold mb-3">Bien compris</h1>
              <p className="text-stone-600 leading-relaxed">
                C&apos;est noté, je n&apos;irai pas plus loin sur cette piste.
                Je garde tout de même vos coordonnées au cas où d&apos;autres opportunités se présenteraient.
              </p>
            </>
          )}
          <p className="text-stone-500 text-sm mt-6">— Marc, Marc Artisan BTP</p>
          <Link href="/" className="mt-8 inline-flex items-center gap-1 text-brand-500 hover:underline text-sm">
            <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    );
  }

  const prenom = info.contact_name.split(' ')[0];

  return (
    <main className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <HardHat className="w-5 h-5 text-brand-500" /> Marc Artisan BTP
          </Link>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <h1 className="text-3xl font-extrabold mb-2">Bonjour {prenom},</h1>
          <p className="text-stone-700 mb-5 leading-relaxed">
            Merci pour votre candidature pour le métier de <strong>{info.metier}</strong> sur <strong>{info.ville}</strong>.
          </p>
          <p className="text-stone-700 mb-5 leading-relaxed">
            Le chantier que vous avez vu sur les réseaux a déjà été confié à un autre artisan, je suis désolé.
          </p>

          <div className="bg-brand-50 border-l-4 border-brand-500 p-5 rounded-r-lg my-6">
            <p className="font-bold mb-2">Cependant, j&apos;ai une opportunité à vous proposer :</p>
            <p className="leading-relaxed">
              J&apos;ai un <strong>apporteur d&apos;affaires personnel</strong> qui m&apos;apporte environ
              <strong> 80% de mes chantiers</strong>. Si ça vous intéresse, je peux vous mettre en
              relation avec lui pour que vous bénéficiez vous aussi de ses apports.
            </p>
          </div>

          <p className="text-stone-700 font-semibold mt-6 mb-4 text-center">
            Voulez-vous être mis en relation avec lui ?
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              type="button"
              onClick={() => handleResponse('oui')}
              disabled={submitting !== null}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-bold px-8 py-4 rounded-lg text-base inline-flex items-center justify-center gap-2 transition-colors"
            >
              {submitting === 'oui' ? <Loader2 className="w-5 h-5 animate-spin" /> : <ThumbsUp className="w-5 h-5" />}
              OUI, je veux être mis en relation
            </button>
            <button
              type="button"
              onClick={() => handleResponse('non')}
              disabled={submitting !== null}
              className="bg-stone-200 hover:bg-stone-300 disabled:opacity-60 text-stone-700 font-medium px-6 py-4 rounded-lg text-base inline-flex items-center justify-center gap-2 transition-colors"
            >
              {submitting === 'non' ? <Loader2 className="w-5 h-5 animate-spin" /> : <ThumbsDown className="w-5 h-5" />}
              Non merci
            </button>
          </div>

          <p className="text-stone-500 text-xs text-center mt-6 italic">
            Aucune obligation : si vous dites oui, je transmets juste votre profil.
            C&apos;est lui qui vous recontactera ensuite directement.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function RelationPage() {
  return (
    <Suspense>
      <RelationContent />
    </Suspense>
  );
}
