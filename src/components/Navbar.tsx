import React from 'react';

interface NavbarProps {
  onFillExample: () => void;
  onReset: () => void;
  hasContent: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onFillExample, onReset, hasContent }) => {
  return (
    <header className="border-b border-slate-200/80 bg-white sticky top-0 z-20">
      <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Lockup: Logo + Promting + Build with K-I-F */}
        <div className="flex items-center gap-2.5">
          {/* Representative Logo */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-xs shrink-0 p-1.5 text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full"
              aria-label="Logo Promting"
            >
              {/* Prompt Chevron */}
              <path
                d="M5 6L10 12L5 18"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 3 Tiered K-I-F Bars */}
              <line
                x1="13"
                y1="7"
                x2="20"
                y2="7"
                stroke="#FFFFFF"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <line
                x1="13"
                y1="12"
                x2="18"
                y2="12"
                stroke="#C7D2FE"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <line
                x1="13"
                y1="17"
                x2="21"
                y2="17"
                stroke="#A5B4FC"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 text-base leading-tight tracking-tight">
              Promting
            </span>
            <span className="text-[10px] font-semibold text-indigo-600 tracking-wide leading-tight">
              Build with K-I-F
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {hasContent && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs text-slate-500 hover:text-rose-600 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={onFillExample}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer min-h-[34px] flex items-center shadow-2xs"
          >
            Isi contoh
          </button>
        </div>
      </div>
    </header>
  );
};
