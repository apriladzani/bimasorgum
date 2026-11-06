import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Search, Sparkles, X } from 'lucide-react';
import { Recipe } from '../../types';
import { DISH_CATEGORIES } from '../../data/mockData';
import { SORGHUM_FORMS, detectSorghumForms } from '../../data/learnData';
import { FALLBACK_FOOD_IMAGE } from '../../data/homeData';
import { categoryLabelToKey, useData } from '../../lib/dataContext';
import { CardImageWithSkeleton } from '../Common/CardSkeleton';

export function categoryTitle(label: string): string {
  const key = categoryLabelToKey(label || '');
  return DISH_CATEGORIES.find((c) => c.id === key)?.title || label || 'Sorgum';
}

interface MenuCardProps {
  recipe: Recipe;
  isGenerated: boolean;
  onOpen: (recipe: Recipe) => void;
  className?: string;
}

export const MenuCard: React.FC<MenuCardProps> = ({ recipe, isGenerated, onOpen, className = '' }) => {
  const { imagesEnabled } = useData();
  const totalTime = (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0);
  const forms = detectSorghumForms(recipe);

  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      onClick={() => onOpen(recipe)}
      className={`text-left bg-white rounded-2xl border border-[#c2c8c0]/60 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group cursor-pointer ${className}`}
    >
      {imagesEnabled && (
        <div className="relative h-32 w-full shrink-0 bg-[#e8eae6] overflow-hidden">
          <CardImageWithSkeleton
            src={recipe.imageUrl || FALLBACK_FOOD_IMAGE}
            alt={recipe.title}
            fallbackSrc={FALLBACK_FOOD_IMAGE}
            containerClassName="w-full h-full relative"
            imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-3 flex-1 flex flex-col gap-1.5 w-full">
        <span
          className={`self-start inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
            isGenerated ? 'bg-[#fdc65c]/40 text-[#7c5800]' : 'bg-[#e8eae6] text-[#424843]'
          }`}
        >
          {isGenerated && <Sparkles className="w-3 h-3" />}
          {isGenerated ? 'Hasil Generate' : 'Contoh'}
        </span>
        <h3 className="text-sm font-bold text-[#1a1c1b] leading-snug line-clamp-2">{recipe.title}</h3>
        <p className="text-[11px] text-[#727972] font-semibold">{categoryTitle(recipe.dishCategory)}</p>
        <div className="mt-auto pt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#424843]">
          {totalTime > 0 && (
            <span className="inline-flex items-center gap-1 font-semibold">
              <Clock className="w-3 h-3" />
              {totalTime} menit
            </span>
          )}
          {forms[0] && <span className="font-semibold text-[#2d4b37]">{forms[0].name}</span>}
        </div>
      </div>
    </motion.button>
  );
};

interface CatalogViewProps {
  recipes: Recipe[];
  generatedIds: Set<string>;
  generatorEnabled: boolean;
  onOpenMenu: (recipe: Recipe) => void;
  onStartGenerator: () => void;
}

const chipClass = (active: boolean) =>
  `shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
    active
      ? 'bg-[#2d4b37] border-[#2d4b37] text-white'
      : 'bg-white border-[#c2c8c0]/60 text-[#424843] hover:bg-[#e2e3e1]'
  }`;

export const CatalogView: React.FC<CatalogViewProps> = ({
  recipes,
  generatedIds,
  generatorEnabled,
  onOpenMenu,
  onStartGenerator,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [formId, setFormId] = useState('all');
  const [onlyGenerated, setOnlyGenerated] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      if (onlyGenerated && !generatedIds.has(r.id)) return false;
      if (category !== 'all' && categoryLabelToKey(r.dishCategory || '') !== category) return false;
      if (formId !== 'all' && !detectSorghumForms(r).some((f) => f.id === formId)) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        (r.ingredients || []).some((i) => (i.name || '').toLowerCase().includes(q))
      );
    });
  }, [recipes, generatedIds, onlyGenerated, category, formId, query]);

  const resetFilters = () => {
    setQuery('');
    setCategory('all');
    setFormId('all');
    setOnlyGenerated(false);
  };

  const showGenerateEmpty = onlyGenerated && generatedIds.size === 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#163422] tracking-tight">Katalog Menu</h2>
          <p className="text-sm text-[#424843] mt-1">Kumpulan menu sorgum dari hasil generate.</p>
        </div>
        {generatorEnabled && (
          <button
            onClick={onStartGenerator}
            className="py-2.5 px-4 bg-[#fdc65c] hover:bg-[#f4be55] text-[#163422] rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Generate Menu Baru
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#727972]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama menu atau bahan"
          aria-label="Cari menu"
          className="w-full bg-white border border-[#c2c8c0]/60 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-[#1a1c1b] placeholder:text-[#727972] focus:outline-none focus:border-[#2d4b37] focus:ring-1 focus:ring-[#2d4b37]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          <button onClick={() => setOnlyGenerated((v) => !v)} aria-pressed={onlyGenerated} className={chipClass(onlyGenerated)}>
            Hasil generate saya ({generatedIds.size})
          </button>
          <span data-keep className="w-px bg-[#c2c8c0] shrink-0 my-1" />
          <button onClick={() => setCategory('all')} aria-pressed={category === 'all'} className={chipClass(category === 'all')}>
            Semua kategori
          </button>
          {DISH_CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCategory(c.id)} aria-pressed={category === c.id} className={chipClass(category === c.id)}>
              {c.title}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          <button onClick={() => setFormId('all')} aria-pressed={formId === 'all'} className={chipClass(formId === 'all')}>
            Semua olahan
          </button>
          {SORGHUM_FORMS.map((f) => (
            <button key={f.id} onClick={() => setFormId(f.id)} aria-pressed={formId === f.id} className={chipClass(formId === f.id)}>
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {showGenerateEmpty ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#c2c8c0] p-8 text-center">
          <span className="material-symbols-outlined text-4xl text-[#2d4b37]">magic_button</span>
          <h3 className="text-base font-bold text-[#163422] mt-2">Belum ada menu hasil generate</h3>
          <p className="text-sm text-[#424843] mt-1 max-w-sm mx-auto">
            Menu yang kamu buat lewat Generate akan muncul di sini.
          </p>
          {generatorEnabled && (
            <button
              onClick={onStartGenerator}
              className="mt-4 py-2.5 px-4 bg-[#2d4b37] hover:bg-[#163422] text-white rounded-2xl font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Mulai Generate
            </button>
          )}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#c2c8c0] p-8 text-center">
          <h3 className="text-base font-bold text-[#163422]">Menu tidak ditemukan</h3>
          <p className="text-sm text-[#424843] mt-1">Coba kata kunci lain atau hapus filter.</p>
          <button
            onClick={resetFilters}
            className="mt-3 py-2 px-3.5 border border-[#c2c8c0] hover:bg-[#e2e3e1] text-[#163422] rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Hapus filter
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs font-semibold text-[#727972]" aria-live="polite">{filtered.length} menu</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((recipe) => (
              <MenuCard
                key={recipe.id}
                recipe={recipe}
                isGenerated={generatedIds.has(recipe.id)}
                onOpen={onOpenMenu}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
