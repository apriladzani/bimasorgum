import React, { useState } from 'react';
import { ArrowLeft, Check, ChefHat, ChevronRight, Clock, Lightbulb, Sparkles, TriangleAlert } from 'lucide-react';
import { Recipe } from '../../types';
import { detectSorghumForms } from '../../data/learnData';
import { FALLBACK_FOOD_IMAGE } from '../../data/homeData';
import { CardImageWithSkeleton } from '../Common/CardSkeleton';
import { CookModeModal } from '../Modals/CookModeModal';
import { useData } from '../../lib/dataContext';
import { categoryTitle } from './CatalogView';

interface MenuDetailViewProps {
  recipe: Recipe;
  isGenerated: boolean;
  generatorEnabled: boolean;
  onBack: () => void;
  onOpenForm: (formId: string) => void;
  onOpenPreparation: () => void;
  onStartGenerator: () => void;
}

const cardClass = 'bg-white rounded-2xl border border-[#c2c8c0]/60 p-5 shadow-earthy-glow';

export const MenuDetailView: React.FC<MenuDetailViewProps> = ({
  recipe,
  isGenerated,
  generatorEnabled,
  onBack,
  onOpenForm,
  onOpenPreparation,
  onStartGenerator,
}) => {
  const [checked, setChecked] = useState<number[]>([]);
  const [cooking, setCooking] = useState(false);
  const { imagesEnabled } = useData();

  const forms = detectSorghumForms(recipe);
  const ingredients = recipe.ingredients || [];
  const steps = recipe.steps || [];
  const nutrition = recipe.nutritionHighlight;
  const warnings = recipe.aiWarnings || [];

  const stats = [
    { label: 'Persiapan', value: `${recipe.prepTimeMinutes || 0} mnt` },
    { label: 'Memasak', value: `${recipe.cookTimeMinutes || 0} mnt` },
    { label: 'Porsi', value: `${recipe.servings || 1}` },
    ...(nutrition?.caloriesEstimate ? [{ label: 'Kalori/porsi', value: `${nutrition.caloriesEstimate} kkal` }] : []),
    ...(nutrition?.fiberGrams ? [{ label: 'Serat', value: `${nutrition.fiberGrams} g` }] : []),
    ...(nutrition?.proteinGrams ? [{ label: 'Protein', value: `${nutrition.proteinGrams} g` }] : []),
  ];

  const toggle = (idx: number) =>
    setChecked((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#163422] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke katalog
      </button>

      <section className={`bg-white rounded-3xl border border-[#c2c8c0]/60 overflow-hidden shadow-earthy-glow ${imagesEnabled ? 'md:grid md:grid-cols-5' : ''}`}>
        {imagesEnabled && (
          <div className="md:col-span-2 h-48 md:h-auto bg-[#e8eae6]">
            <CardImageWithSkeleton
              src={recipe.imageUrl || FALLBACK_FOOD_IMAGE}
              alt={recipe.title}
              fallbackSrc={FALLBACK_FOOD_IMAGE}
              containerClassName="w-full h-full relative"
              imageClassName="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="md:col-span-3 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                isGenerated ? 'bg-[#fdc65c]/40 text-[#7c5800]' : 'bg-[#e8eae6] text-[#424843]'
              }`}
            >
              {isGenerated && <Sparkles className="w-3 h-3" />}
              {isGenerated ? 'Hasil Generate' : 'Contoh'}
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#eef3ec] text-[#2d4b37]">
              {categoryTitle(recipe.dishCategory)}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#163422] tracking-tight leading-tight mt-2">{recipe.title}</h2>
          <p className="text-sm text-[#424843] leading-relaxed mt-1.5">{recipe.subtitle}</p>
          {recipe.targetAge && <p className="text-xs text-[#727972] font-semibold mt-2">Cocok untuk: {recipe.targetAge}</p>}

          <dl className="grid grid-cols-3 gap-2 mt-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#f4f5f2] rounded-xl px-2.5 py-2">
                <dt className="text-[10px] font-bold text-[#727972]">{s.label}</dt>
                <dd className="text-sm font-extrabold text-[#163422] mt-0.5">{s.value}</dd>
              </div>
            ))}
          </dl>

          {steps.length > 0 && (
            <button
              onClick={() => setCooking(true)}
              className="mt-4 w-full sm:w-auto py-3 px-5 bg-[#2d4b37] hover:bg-[#163422] text-white rounded-2xl font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ChefHat className="w-4 h-4" />
              Mulai Mode Masak
            </button>
          )}
        </div>
      </section>

      {warnings.length > 0 && (
        <div role="alert" className="flex gap-2.5 bg-[#fdc65c]/20 border border-[#7c5800]/25 rounded-2xl p-4 text-[#5c4100]">
          <TriangleAlert className="w-4 h-4 shrink-0 mt-0.5" />
          <ul className="text-xs font-semibold leading-relaxed space-y-1">
            {warnings.map((w) => <li key={w.message}>{w.message}</li>)}
          </ul>
        </div>
      )}

      <div className="grid md:grid-cols-12 gap-5 items-start">
        <div className="md:col-span-5 space-y-5">
          <section className={cardClass}>
            <h3 className="text-base font-bold text-[#163422]">Sebelum memasak</h3>
            <p className="text-xs text-[#727972] mt-0.5">Olahan sorgum yang perlu disiapkan untuk menu ini.</p>
            <ul className="mt-3 space-y-2">
              {forms.map((form) => (
                <li key={form.id}>
                  <button
                    onClick={() => onOpenForm(form.id)}
                    className="w-full flex items-center gap-3 text-left rounded-xl bg-[#eef3ec] hover:bg-[#e2eadf] px-3 py-2.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[22px] text-[#2d4b37]">{form.icon}</span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-bold text-[#163422]">{form.name}</span>
                      <span className="block text-xs text-[#424843]">{form.totalTime}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#2d4b37] shrink-0" />
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenPreparation}
                  className="w-full flex items-center gap-3 text-left rounded-xl border border-[#c2c8c0]/60 hover:bg-[#f0f1ee] px-3 py-2.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[22px] text-[#2d4b37]">checklist</span>
                  <span className="flex-1 text-sm font-bold text-[#163422]">Alat dan checklist persiapan</span>
                  <ChevronRight className="w-4 h-4 text-[#2d4b37] shrink-0" />
                </button>
              </li>
            </ul>
          </section>

          <section className={cardClass}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-bold text-[#163422]">Bahan</h3>
              <span className="text-xs font-bold text-[#727972]">{recipe.servings || 1} porsi</span>
            </div>
            {ingredients.length === 0 ? (
              <p className="text-sm text-[#727972] mt-3">Daftar bahan belum tersedia.</p>
            ) : (
              <ul className="mt-2 divide-y divide-[#c2c8c0]/30">
                {ingredients.map((item, idx) => {
                  const isChecked = checked.includes(idx);
                  return (
                    <li key={`${item.name}-${idx}`}>
                      <button
                        onClick={() => toggle(idx)}
                        role="checkbox"
                        aria-checked={isChecked}
                        className="w-full flex items-start gap-3 text-left py-2.5 cursor-pointer"
                      >
                        <span
                          className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? 'bg-[#2d4b37] border-[#2d4b37] text-white' : 'bg-white border-[#727972]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </span>
                        <span className={`flex-1 min-w-0 text-sm ${isChecked ? 'text-[#727972] line-through' : 'text-[#1a1c1b]'}`}>
                          {item.name}
                          {item.notes && <span className="block text-xs text-[#727972]">{item.notes}</span>}
                        </span>
                        <span className="text-xs font-bold text-[#7c5800] text-right shrink-0 max-w-[35%]">{item.amount}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        <div className="md:col-span-7 space-y-5">
          <section className={cardClass}>
            <h3 className="text-base font-bold text-[#163422]">Langkah memasak</h3>
            {steps.length === 0 ? (
              <p className="text-sm text-[#727972] mt-3">Langkah memasak belum tersedia.</p>
            ) : (
              <ol className="mt-4 space-y-5">
                {steps.map((step, idx) => (
                  <li key={`${step.stepNumber}-${step.title}`} className="flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#2d4b37] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                      {step.stepNumber || idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h4 className="text-sm font-bold text-[#1a1c1b]">{step.title}</h4>
                        {!!step.timerMinutes && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#7c5800] bg-[#fdc65c]/30 px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3" />
                            {step.timerMinutes} menit
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#424843] leading-relaxed mt-1">{step.instruction}</p>
                      {step.tip && (
                        <p className="mt-2 flex gap-1.5 text-xs text-[#2d4b37] bg-[#eef3ec] rounded-lg px-2.5 py-2 leading-relaxed">
                          <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          {step.tip}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>

          {nutrition?.description && (
            <section className={cardClass}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-[#163422]">Catatan gizi</h3>
                {nutrition.glycemicIndex && (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#eef3ec] text-[#2d4b37]">
                    IG: {nutrition.glycemicIndex}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#424843] leading-relaxed mt-2">{nutrition.description}</p>
            </section>
          )}

          {generatorEnabled && (
            <section className="bg-gradient-to-r from-[#163422] to-[#2d4b37] text-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold">Ingin menu dengan bahan lain?</h3>
                <p className="text-xs text-white/85 mt-0.5">Generate menu baru sesuai bahan di dapurmu.</p>
              </div>
              <button
                onClick={onStartGenerator}
                className="py-2.5 px-4 bg-[#fdc65c] hover:bg-[#f4be55] text-[#163422] rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Generate Menu
              </button>
            </section>
          )}
        </div>
      </div>

      {cooking && <CookModeModal recipe={recipe} onClose={() => setCooking(false)} />}
    </div>
  );
};
