import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { COMMON_MISTAKES, COOKING_RATIOS, PREP_CHECKLIST, PREP_TOOLS } from '../../data/learnData';

interface PreparationViewProps {
  onNext: () => void;
}

const cardClass = 'bg-white rounded-2xl border border-[#c2c8c0]/60 p-5 shadow-earthy-glow';

export const PreparationView: React.FC<PreparationViewProps> = ({ onNext }) => {
  const [checked, setChecked] = useState<number[]>([]);
  const toggle = (idx: number) =>
    setChecked((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  const done = checked.length === PREP_CHECKLIST.length;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#163422] tracking-tight">Persiapan Memasak</h2>
        <p className="text-sm text-[#424843] mt-1">Siapkan alat, takaran, dan bahan sebelum mulai memasak menu.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 items-start">
        <section className={cardClass}>
          <h3 className="text-base font-bold text-[#163422]">Alat yang dibutuhkan</h3>
          <ul className="mt-3 space-y-3">
            {PREP_TOOLS.map((tool) => (
              <li key={tool.name} className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-xl bg-[#eef3ec] text-[#2d4b37] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{tool.icon}</span>
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1a1c1b]">{tool.name}</p>
                  <p className="text-xs text-[#424843] leading-relaxed">{tool.purpose}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={cardClass}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-bold text-[#163422]">Checklist sebelum masak</h3>
            <span className="text-xs font-bold text-[#7c5800] bg-[#fdc65c]/30 px-2 py-0.5 rounded-full shrink-0">
              {checked.length}/{PREP_CHECKLIST.length}
            </span>
          </div>
          <ul className="mt-3 space-y-1">
            {PREP_CHECKLIST.map((item, idx) => {
              const isChecked = checked.includes(idx);
              return (
                <li key={item}>
                  <button
                    onClick={() => toggle(idx)}
                    role="checkbox"
                    aria-checked={isChecked}
                    className="w-full flex items-start gap-3 text-left rounded-xl px-2 py-2 hover:bg-[#f0f1ee] transition-colors cursor-pointer"
                  >
                    <span
                      className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        isChecked ? 'bg-[#2d4b37] border-[#2d4b37] text-white' : 'bg-white border-[#727972]'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </span>
                    <span className={`text-sm leading-relaxed ${isChecked ? 'text-[#727972] line-through' : 'text-[#1a1c1b]'}`}>
                      {item}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {done && (
            <p className="mt-3 text-xs font-bold text-[#2d4b37] bg-[#eef3ec] rounded-lg px-3 py-2">
              Semua siap. Saatnya memilih menu dari katalog.
            </p>
          )}
        </section>
      </div>

      <section className={cardClass}>
        <h3 className="text-base font-bold text-[#163422]">Takaran air dan waktu masak</h3>
        <p className="text-xs text-[#727972] mt-0.5">Perbandingan volume sorgum : air. Waktu bisa berbeda tergantung jenis sorgum.</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm text-left">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-[#727972] border-b border-[#c2c8c0]/60">
                <th scope="col" className="py-2 pr-3 font-bold">Bentuk</th>
                <th scope="col" className="py-2 pr-3 font-bold">Sorgum : Air</th>
                <th scope="col" className="py-2 pr-3 font-bold">Waktu</th>
                <th scope="col" className="py-2 font-bold">Hasil</th>
              </tr>
            </thead>
            <tbody>
              {COOKING_RATIOS.map((row) => (
                <tr key={row.form} className="border-b border-[#c2c8c0]/30 last:border-0">
                  <td className="py-2.5 pr-3 font-semibold text-[#1a1c1b]">{row.form}</td>
                  <td className="py-2.5 pr-3 font-bold text-[#7c5800] whitespace-nowrap">{row.water}</td>
                  <td className="py-2.5 pr-3 text-[#424843] whitespace-nowrap">{row.time}</td>
                  <td className="py-2.5 text-[#424843]">{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-[#163422] mb-3">Masalah yang sering muncul</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {COMMON_MISTAKES.map((m) => (
            <article key={m.problem} className="bg-white rounded-2xl border border-[#c2c8c0]/60 p-4 shadow-earthy-glow">
              <h4 className="text-sm font-bold text-[#1a1c1b]">{m.problem}</h4>
              <p className="text-xs text-[#727972] mt-1 leading-relaxed">{m.cause}</p>
              <p className="text-xs text-[#2d4b37] font-semibold mt-2 leading-relaxed">{m.fix}</p>
            </article>
          ))}
        </div>
      </section>

      <button
        onClick={onNext}
        className="w-full sm:w-auto py-3 px-5 bg-[#2d4b37] hover:bg-[#163422] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        Lanjut ke Katalog Menu
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
