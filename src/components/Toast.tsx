import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastProps {
  show: boolean;
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ show, type, message, onClose }) => {
  if (!show) return null;

  const isSuccess = type === 'success';
  const isError = type === 'error';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-50 flex items-center justify-between gap-3 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 transition-all duration-200"
    >
      {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
      {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
      {!isSuccess && !isError && <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />}

      <span className="text-sm font-medium text-slate-100">{message}</span>

      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition-colors p-1"
        aria-label="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
