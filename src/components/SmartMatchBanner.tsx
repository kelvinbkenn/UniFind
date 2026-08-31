import React from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { Item } from '../types';
import { findSmartMatches } from '../utils/helpers';

interface SmartMatchBannerProps {
  items: Item[];
  onOpenItemDetail: (item: Item) => void;
}

export const SmartMatchBanner: React.FC<SmartMatchBannerProps> = ({
  items,
  onOpenItemDetail
}) => {
  const [dismissed, setDismissed] = React.useState(false);

  // Compute top match across all active items
  const bestMatch = React.useMemo(() => {
    const activeLost = items.filter((i) => i.type === 'lost' && i.status === 'active');
    let highestScore = 0;
    let topLost: Item | null = null;
    let topFound: Item | null = null;
    let topReasons: string[] = [];

    for (const lost of activeLost) {
      const matches = findSmartMatches(lost, items);
      if (matches.length > 0 && matches[0].score > highestScore) {
        highestScore = matches[0].score;
        topLost = lost;
        topFound = matches[0].item;
        topReasons = matches[0].matchedFields;
      }
    }

    if (highestScore >= 50 && topLost && topFound) {
      return { lost: topLost, found: topFound, score: highestScore, reasons: topReasons };
    }
    return null;
  }, [items]);

  if (dismissed || !bestMatch) return null;

  return (
    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-indigo-500/15 to-emerald-500/15 border border-amber-400/30 dark:border-amber-500/20 backdrop-blur-md relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                AI Match Alert ({bestMatch.score}% Match Confidence)
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-0.5">
              Potential match between <span className="underline decoration-rose-400 underline-offset-2">"{bestMatch.lost.title}"</span> and <span className="underline decoration-emerald-400 underline-offset-2">"{bestMatch.found.title}"</span>
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Reason: {bestMatch.reasons.join(' • ')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={() => onOpenItemDetail(bestMatch.found)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
          >
            <span>Review Found Item</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
            title="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
