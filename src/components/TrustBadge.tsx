import React from 'react';
import { TrustLabel } from '../types';

interface TrustBadgeProps {
  label: TrustLabel;
  className?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ label, className = '' }) => {
  const getStyle = () => {
    switch (label) {
      case 'FACT FROM YOU':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'INFERENCE':
        return 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10';
      case 'POSSIBILITY':
        return 'text-amber-300 border-amber-500/30 bg-amber-500/10';
      case 'QUESTION':
        return 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-800/40';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold font-mono border rounded ${getStyle()} ${className}`}
      title={`AI Trust Layer: ${label}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
};
