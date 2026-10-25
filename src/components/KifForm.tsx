import React, { useState } from 'react';
import { KifFormData, OutputFormat, ToneStyle, LengthStyle } from '../types';
import { ChevronDown, ChevronUp, Sparkles, Check } from 'lucide-react';

interface KifFormProps {
  formData: KifFormData;
  onChange: (field: keyof KifFormData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  errors: {
    instruction?: string;
    roleOrSituation?: string;
  };
}

const FORMAT_OPTIONS: OutputFormat[] = ['Teks', 'Poin-poin', 'Tabel', 'Langkah-langkah'];
const TONE_OPTIONS: ToneStyle[] = ['Profesional', 'Santai', 'Formal', 'Kreatif'];
const LENGTH_OPTIONS: LengthStyle[] = ['Singkat', 'Sedang', 'Terperinci'];

export const KifForm: React.FC<KifFormProps> = ({
  formData,
  onChange,
  onSubmit,
  errors,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Count active advanced options to show a subtle badge
  const activeAdvancedCount = [
    Boolean(formData.aiRole?.trim()),
    formData.stepByStep,
    Boolean(formData.fewShotExamples?.trim()),
    Boolean(formData.constraints?.trim()),
  ].filter(Boolean).length;

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Bagian K — Konteks */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
            K
          </span>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Konteks
          </h2>
        </div>

        <div>
          <label htmlFor="role-situation" className="block text-xs font-medium text-slate-700 mb-1">
            Peran atau situasi
          </label>
          <input
            id="role-situation"
            type="text"
            value={formData.roleOrSituation}
            onChange={(e) => onChange('roleOrSituation', e.target.value)}
            placeholder="Contoh: Social media manager untuk bisnis kopi lokal"
            className={`w-full min-h-[44px] px-3.5 py-2.5 text-base sm:text-sm bg-white border rounded-xl focus:outline-none focus:ring-1 transition-colors text-slate-900 placeholder:text-slate-400 ${
              errors.roleOrSituation
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-600'
            }`}
          />
          {errors.roleOrSituation && (
            <p className="mt-1 text-xs text-rose-600">{errors.roleOrSituation}</p>
          )}
        </div>

        <div>
          <label htmlFor="audience" className="block text-xs font-medium text-slate-700 mb-1">
            Target audiens <span className="text-slate-400 font-normal">(opsional)</span>
          </label>
          <input
            id="audience"
            type="text"
            value={formData.audience}
            onChange={(e) => onChange('audience', e.target.value)}
            placeholder="Contoh: Anak muda usia 18–30 tahun"
            className="w-full min-h-[44px] px-3.5 py-2.5 text-base sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:border-indigo-600 focus:ring-indigo-600 transition-colors text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Bagian I — Instruksi */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
            I
          </span>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Instruksi
          </h2>
        </div>

        <div>
          <label htmlFor="instruction" className="block text-xs font-medium text-slate-700 mb-1">
            Tugas yang diinginkan
          </label>
          <textarea
            id="instruction"
            rows={3}
            value={formData.instruction}
            onChange={(e) => onChange('instruction', e.target.value)}
            placeholder="Contoh: Buatkan kalender konten Instagram untuk promosi produk kopi baru selama 7 hari"
            className={`w-full min-h-[88px] px-3.5 py-2.5 text-base sm:text-sm bg-white border rounded-xl focus:outline-none focus:ring-1 transition-colors text-slate-900 placeholder:text-slate-400 resize-y ${
              errors.instruction
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500'
                : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-600'
            }`}
          />
          {errors.instruction && (
            <p className="mt-1 text-xs text-rose-600">{errors.instruction}</p>
          )}
        </div>
      </div>

      {/* Bagian F — Format */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            F
          </span>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            Format
          </h2>
        </div>

        {/* Bentuk output */}
        <div>
          <span className="block text-xs font-medium text-slate-700 mb-1.5">
            Bentuk output
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {FORMAT_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange('format', opt)}
                className={`min-h-[44px] px-3 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                  formData.format === opt
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Gaya bahasa */}
        <div>
          <span className="block text-xs font-medium text-slate-700 mb-1.5">
            Gaya bahasa
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TONE_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange('tone', opt)}
                className={`min-h-[44px] px-3 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                  formData.tone === opt
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Panjang */}
        <div>
          <span className="block text-xs font-medium text-slate-700 mb-1.5">
            Panjang
          </span>
          <div className="grid grid-cols-3 gap-2">
            {LENGTH_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange('length', opt)}
                className={`min-h-[44px] px-3 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                  formData.length === opt
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== TEKNIK LANJUTAN (OPSIONAL) ==================== */}
      <div className="pt-2 border-t border-slate-200/80">
        <button
          type="button"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="w-full min-h-[44px] py-2 px-3 flex items-center justify-between text-left text-xs font-semibold text-slate-800 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
          aria-expanded={isAdvancedOpen}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Teknik Lanjutan (Opsional)</span>
            {activeAdvancedCount > 0 && (
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {activeAdvancedCount} aktif
              </span>
            )}
          </div>
          {isAdvancedOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {isAdvancedOpen && (
          <div className="mt-3 p-4 bg-slate-50/70 border border-slate-200/90 rounded-2xl space-y-4 text-left">
            {/* 1. Role Prompting */}
            <div className="space-y-2">
              <span className="block text-xs font-bold text-slate-900">
                1. Role Prompting (Peran AI)
              </span>
              <div>
                <label htmlFor="ai-role" className="block text-[11px] font-medium text-slate-600 mb-1">
                  Peran atau keahlian AI
                </label>
                <input
                  id="ai-role"
                  type="text"
                  value={formData.aiRole}
                  onChange={(e) => onChange('aiRole', e.target.value)}
                  placeholder="Contoh: Konsultan marketing senior"
                  className="w-full min-h-[44px] px-3.5 py-2 text-base sm:text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:border-indigo-600 focus:ring-indigo-600 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label htmlFor="ai-spec" className="block text-[11px] font-medium text-slate-600 mb-1">
                  Pengalaman atau spesialisasi <span className="text-slate-400 font-normal">(opsional)</span>
                </label>
                <input
                  id="ai-spec"
                  type="text"
                  value={formData.aiSpecialization}
                  onChange={(e) => onChange('aiSpecialization', e.target.value)}
                  placeholder="Contoh: Di industri F&B dan kafe lokal"
                  className="w-full min-h-[44px] px-3.5 py-2 text-base sm:text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:border-indigo-600 focus:ring-indigo-600 text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* 2. Step-by-Step Toggle */}
            <div className="pt-2 border-t border-slate-200/60">
              <span className="block text-xs font-bold text-slate-900 mb-1.5">
                2. Step-by-Step (Pengerjaan Bertahap)
              </span>
              <label className="flex items-start gap-3 p-2.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.stepByStep}
                  onChange={(e) => onChange('stepByStep', e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800 block">
                    Susun tugas menjadi beberapa langkah
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    Meminta AI menguraikan langkah kerja, alasan ringkas, dan hasil yang dapat diperiksa.
                  </span>
                </div>
              </label>
            </div>

            {/* 3. Few-Shot Examples */}
            <div className="pt-2 border-t border-slate-200/60">
              <span className="block text-xs font-bold text-slate-900 mb-1">
                3. Few-Shot Examples (Contoh Output)
              </span>
              <label htmlFor="few-shot" className="block text-[11px] text-slate-500 mb-1.5">
                Masukkan 1–3 contoh output yang disukai sebagai referensi gaya atau struktur (opsional).
              </label>
              <textarea
                id="few-shot"
                rows={2}
                value={formData.fewShotExamples}
                onChange={(e) => onChange('fewShotExamples', e.target.value)}
                placeholder="Contoh: Hari 1: [Visual estetik latte art] - Caption: Awali pagi dengan kehangatan kopi pilihanmu..."
                className="w-full min-h-[64px] px-3.5 py-2 text-base sm:text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:border-indigo-600 focus:ring-indigo-600 text-slate-900 placeholder:text-slate-400 resize-y"
              />
            </div>

            {/* 4. Constraints */}
            <div className="pt-2 border-t border-slate-200/60">
              <span className="block text-xs font-bold text-slate-900 mb-1">
                4. Batasan Tambahan (Constraints)
              </span>
              <label htmlFor="constraints" className="block text-[11px] text-slate-500 mb-1.5">
                Aturan penting seperti hal yang harus dihindari, batasan khusus, atau panjang maksimal.
              </label>
              <input
                id="constraints"
                type="text"
                value={formData.constraints}
                onChange={(e) => onChange('constraints', e.target.value)}
                placeholder="Contoh: Jangan gunakan kata klise, maksimal 200 kata per post, nada bicara ramah"
                className="w-full min-h-[44px] px-3.5 py-2 text-base sm:text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:border-indigo-600 focus:ring-indigo-600 text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Primary Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full min-h-[48px] px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center"
        >
          Buat Prompt
        </button>
      </div>
    </form>
  );
};
