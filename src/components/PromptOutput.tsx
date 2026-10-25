import React, { useState, useEffect } from 'react';
import { Copy, Check, Edit3, RotateCcw, RefreshCw, CornerDownLeft } from 'lucide-react';

interface PromptOutputProps {
  promptText: string;
  onCopy: (text: string) => void;
  onEditSave: (newText: string) => void;
  onReset: () => void;
  onApplyFeedback: (feedback: string) => void;
  copied: boolean;
}

const QUICK_FEEDBACK_ITEMS = [
  'Buat lebih singkat',
  'Ubah gaya menjadi lebih santai',
  'Tambahkan contoh konkret',
  'Buat 3 alternatif',
];

export const PromptOutput: React.FC<PromptOutputProps> = ({
  promptText,
  onCopy,
  onEditSave,
  onReset,
  onApplyFeedback,
  copied,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(promptText);
  const [feedbackInput, setFeedbackInput] = useState('');

  useEffect(() => {
    setEditedText(promptText);
  }, [promptText]);

  const handleSave = () => {
    onEditSave(editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(promptText);
    setIsEditing(false);
  };

  const handleFeedbackSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!feedbackInput.trim()) return;
    onApplyFeedback(feedbackInput.trim());
    setFeedbackInput('');
  };

  const handleQuickFeedbackClick = (item: string) => {
    setFeedbackInput(item);
  };

  return (
    <section id="hasil-prompt" className="space-y-4 pt-6 border-t border-slate-200">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
          Hasil Prompt
        </h2>
        <div className="flex items-center gap-1">
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer min-h-[36px]"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>
          )}
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-slate-500 hover:text-rose-600 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1 cursor-pointer min-h-[36px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Result Display / Edit Box */}
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={10}
            className="w-full p-3.5 font-mono text-sm bg-slate-900 text-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 border border-slate-700 leading-relaxed resize-y"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer min-h-[40px]"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer min-h-[40px]"
            >
              Simpan
            </button>
          </div>
        </div>
      ) : (
        <pre className="w-full p-3.5 sm:p-4 font-mono text-xs sm:text-sm bg-slate-900 text-slate-100 rounded-xl whitespace-pre-wrap break-words leading-relaxed border border-slate-800">
          {promptText}
        </pre>
      )}

      {/* Iterasi Prompt: Perbaiki Prompt */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">
            Perbaiki Prompt (Iterasi)
          </span>
          <span className="text-[11px] text-slate-500">
            Sertakan instruksi perbaikan
          </span>
        </div>

        <form onSubmit={handleFeedbackSubmit} className="flex gap-2">
          <input
            type="text"
            value={feedbackInput}
            onChange={(e) => setFeedbackInput(e.target.value)}
            placeholder="Contoh: Buat lebih singkat, ubah gaya santai..."
            className="flex-1 min-h-[44px] px-3 py-2 text-base sm:text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:border-indigo-600 focus:ring-indigo-600 text-slate-900 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={!feedbackInput.trim()}
            className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Perbarui</span> Prompt
          </button>
        </form>

        {/* Quick feedback chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {QUICK_FEEDBACK_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleQuickFeedbackClick(item)}
              className="text-[11px] px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 text-slate-600 rounded-lg transition-colors cursor-pointer"
            >
              + {item}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Copy Button */}
      <button
        type="button"
        onClick={() => onCopy(isEditing ? editedText : promptText)}
        className="w-full min-h-[48px] px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-300" />
            Tersalin ke Clipboard!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Salin Prompt
          </>
        )}
      </button>
    </section>
  );
};
