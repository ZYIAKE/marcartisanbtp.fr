'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HardHat, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const TRADES = [
  'Maçonnerie', 'Plaquiste', 'Électricité', 'Plomberie', 'Chauffage',
  'Carrelage', 'Peinture', 'Menuiserie', 'Couvreur', 'Façadier',
  'Étanchéité', 'Isolation', 'Charpente', 'Vitrerie', 'Serrurerie',
  'Parquet', 'Domoticien', 'Climatisation', 'Photovoltaïque', 'Autre',
];

const POLLEN_API = 'https://atschgnbsrvswavtzeut.supabase.co/functions/v1/marc-postule-submit';
const POLLEN_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0c2NoZ25ic3J2c3dhdnR6ZXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0ODIyMTgsImV4cCI6MjA5MzA1ODIxOH0.M2V9iqpYw1oz-a3F95N5LJIXkaFk8n4sxkHaddGdjVs';

interface FormState {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  siren_siret: string;
  metier: string;
  metier_autre: string;
  ville: string;
  code_postal: string;
  dispo: '' | 'des_maintenant' | 'd_ici_un_mois' | 'd_ici_3_mois';
  message: string;
  consent: boolean;
}

// Valide le format d'un SIREN (9 chiffres) ou SIRET (14 chiffres)
function isValidSirenOrSiret(value: string): boolean {
  const digits = value.replace(/\s/g, '');
  if (!/^\d+$/.test(digits)) return false;
  return digits.length === 9 || digits.length === 14;
}

export default function PostulerPage() {
  const [form, setForm] = useState<FormState>({
    prenom: '', nom: '', email: '', telephone: '',
    entreprise: '', siren_siret: '',
    metier: '', metier_autre: '', ville: '', code_postal: '',
    dispo: '', message: '', consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.consent) { setError('Vous devez accepter le traitement de vos données.'); return; }
    if (!form.prenom || !form.nom || !form.email || !form.telephone || !form.entreprise || !form.siren_siret || !form.metier || !form.ville) {
      setError('Tous les champs marqués * sont obligatoires.');
      return;
    }
    if (!isValidSirenOrSiret(form.siren_siret)) {
      setError('SIREN (9 chiffres) ou SIRET (14 chiffres) invalide. Vérifiez votre numéro sur https://annuaire-entreprises.data.gouv.fr');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(POLLEN_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${POLLEN_ANON}`,
          apikey: POLLEN_ANON,
        },
        body: JSON.stringify({
          prenom: form.prenom.trim(),
          nom: form.nom.trim(),
          email: form.email.trim(),
          telephone: form.telephone.trim(),
          entreprise: form.entreprise.trim(),
          siren_siret: form.siren_siret.replace(/\s/g, ''),
          metier: form.metier === 'Autre' ? form.metier_autre.trim() : form.metier,
          ville: form.ville.trim(),
          code_postal: form.code_postal.trim(),
          dispo: form.dispo,
          message: form.message.trim(),
          source: 'marcartisanbtp.fr',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold mb-3">Candidature envoyée !</h1>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Merci {form.prenom}, on a bien reçu votre candidature. On vous recontacte sous 24h
            ouvrées par téléphone ou email.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-700 font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <HardHat className="w-5 h-5 text-brand-500" />
            Marc Artisan BTP
          </Link>
          <Link href="/" className="text-sm text-stone-600 hover:text-brand-500 inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Postuler</h1>
        <p className="text-stone-600 mb-8">
          Remplissez ce formulaire — réponse sous 24h ouvrées.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-5 border border-stone-200">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Prénom *" value={form.prenom} onChange={(v) => update('prenom', v)} disabled={submitting} />
            <Field label="Nom *" value={form.nom} onChange={(v) => update('nom', v)} disabled={submitting} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email *" type="email" value={form.email} onChange={(v) => update('email', v)} disabled={submitting} />
            <Field label="Téléphone *" type="tel" value={form.telephone} onChange={(v) => update('telephone', v)} disabled={submitting} />
          </div>

          <div>
            <Label>Métier principal *</Label>
            <select
              value={form.metier}
              onChange={(e) => update('metier', e.target.value)}
              required
              disabled={submitting}
              className="w-full h-11 px-3 rounded-lg border border-stone-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none"
            >
              <option value="">Sélectionnez votre métier…</option>
              {TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {form.metier === 'Autre' && (
              <Field label="" placeholder="Précisez votre métier" value={form.metier_autre} onChange={(v) => update('metier_autre', v)} disabled={submitting} className="mt-2" />
            )}
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Field label="Ville *" value={form.ville} onChange={(v) => update('ville', v)} disabled={submitting} />
            </div>
            <Field label="Code postal" value={form.code_postal} onChange={(v) => update('code_postal', v)} disabled={submitting} />
          </div>

          <Field
            label="Nom de l'entreprise *"
            value={form.entreprise}
            onChange={(v) => update('entreprise', v)}
            disabled={submitting}
            placeholder="Ex : SARL Dupont BTP"
          />

          <div>
            <Label>SIREN (9 chiffres) ou SIRET (14 chiffres) *</Label>
            <input
              type="text"
              value={form.siren_siret}
              onChange={(e) => update('siren_siret', e.target.value)}
              disabled={submitting}
              required
              inputMode="numeric"
              pattern="[0-9 ]+"
              placeholder="123 456 789 ou 12345678901234"
              className="w-full h-11 px-3 rounded-lg border border-stone-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none"
            />
            <p className="text-xs text-stone-500 mt-1">
              Vous pouvez vérifier votre numéro sur{' '}
              <a
                href="https://annuaire-entreprises.data.gouv.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-500 underline"
              >
                annuaire-entreprises.data.gouv.fr
              </a>
            </p>
            {form.siren_siret && !isValidSirenOrSiret(form.siren_siret) && (
              <p className="text-sm text-red-600 mt-2 flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                Format invalide — il faut 9 chiffres (SIREN) ou 14 chiffres (SIRET).
              </p>
            )}
          </div>

          <div>
            <Label>Disponibilité</Label>
            <select
              value={form.dispo}
              onChange={(e) => update('dispo', e.target.value as FormState['dispo'])}
              disabled={submitting}
              className="w-full h-11 px-3 rounded-lg border border-stone-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none"
            >
              <option value="">— sélectionnez —</option>
              <option value="des_maintenant">Dès maintenant</option>
              <option value="d_ici_un_mois">D&apos;ici un mois</option>
              <option value="d_ici_3_mois">D&apos;ici 3 mois</option>
            </select>
          </div>

          <div>
            <Label>Message (optionnel)</Label>
            <textarea
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              disabled={submitting}
              rows={4}
              maxLength={500}
              placeholder="Quelques mots sur vous, votre expérience, votre zone d'intervention…"
              className="w-full px-3 py-2.5 rounded-lg border border-stone-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none resize-none"
            />
            <p className="text-xs text-stone-500 mt-1">{form.message.length} / 500</p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => update('consent', e.target.checked)}
              disabled={submitting}
              className="mt-1"
              required
            />
            <span className="text-sm text-stone-600 leading-relaxed">
              J&apos;accepte que mes données soient utilisées par Marc Artisan BTP pour traiter ma
              candidature. Conservées 12 mois maximum, supprimées sur demande à
              contact@marcartisanbtp.fr.
            </span>
          </label>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-base"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {submitting ? 'Envoi…' : 'Envoyer ma candidature'}
          </button>
        </form>
      </section>
    </main>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="block text-sm font-semibold text-stone-700 mb-1.5">{children}</p>;
}

function Field({
  label, value, onChange, type = 'text', placeholder, disabled, className = '',
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; disabled?: boolean; className?: string;
}) {
  return (
    <div className={className}>
      {label ? <Label>{label}</Label> : null}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={label.includes('*')}
        className="w-full h-11 px-3 rounded-lg border border-stone-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none"
      />
    </div>
  );
}

