import React from 'react';
import { 
  MapPin, 
  Clock, 
  Award, 
  ShieldCheck, 
  MessageCircle, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { Item } from '../types';
import { CAMPUS_LOCATIONS, CATEGORIES_CONFIG } from '../data/mockData';
import { formatRelativeTime } from '../utils/helpers';
import { CategoryIcon } from './CategoryIcon';

interface ItemCardProps {
  item: Item;
  viewMode: 'grid' | 'list';
  onOpenDetail: (item: Item) => void;
  onQuickClaim: (item: Item) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  viewMode,
  onOpenDetail,
  onQuickClaim
}) => {
  const location = CAMPUS_LOCATIONS.find((l) => l.id === item.locationId);
  const categoryConfig = CATEGORIES_CONFIG.find((c) => c.id === item.category);
  const isLost = item.type === 'lost';
  const isResolved = item.status === 'resolved';
  const isPending = item.status === 'claim_pending';

  const defaultImage = item.images && item.images.length > 0 
    ? item.images[0] 
    : 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80';

  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onOpenDetail(item)}
        className="group cursor-pointer flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/70 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-md transition-all duration-200"
      >
        {/* Thumbnail */}
        <div className="relative w-full sm:w-28 h-28 sm:h-24 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0">
          <img
            src={defaultImage}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 left-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm ${
              isLost ? 'bg-rose-500' : 'bg-emerald-600'
            }`}>
              {isLost ? 'Lost' : 'Found'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
              categoryConfig?.color || 'bg-slate-100 text-slate-700'
            }`}>
              <CategoryIcon category={item.category} className="w-3 h-3" />
              {categoryConfig?.label}
            </span>

            {isResolved && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Reunited
              </span>
            )}

            {isPending && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                Claim Under Review
              </span>
            )}

            {item.reward && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-400/40">
                <Award className="w-3 h-3 text-amber-500" />
                Reward: {item.reward}
              </span>
            )}
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {item.title}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
            {item.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <strong className="text-slate-700 dark:text-slate-300">{location?.name || 'Campus'}</strong>
              <span className="text-slate-400 hidden md:inline">({item.locationDetails})</span>
            </span>

            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Event Date: {item.eventDate} ({formatRelativeTime(item.dateReported)})</span>
            </span>

            {item.safeDropOffLocationId && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Safe Drop-off at Desk
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto shrink-0 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickClaim(item);
            }}
            className={`w-full sm:w-auto px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isLost
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 border border-rose-200 dark:border-rose-800'
                : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800'
            }`}
          >
            {isLost ? 'I Found This' : 'Claim Item'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onOpenDetail(item)}
      className="group cursor-pointer flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Card Image Banner */}
      <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-900 overflow-hidden">
        <img
          src={defaultImage}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white shadow-md backdrop-blur-md flex items-center gap-1.5 ${
            isLost ? 'bg-rose-500/90' : 'bg-emerald-600/90'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            {isLost ? 'Lost Item' : 'Found Item'}
          </span>

          {isResolved && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Reunited
            </span>
          )}

          {isPending && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
              Claim Pending
            </span>
          )}
        </div>

        {/* Bottom image overlay information */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-md font-medium">
            <Clock className="w-3 h-3 text-slate-300" />
            {formatRelativeTime(item.dateReported)}
          </span>

          {item.reward && (
            <span className="flex items-center gap-1 bg-amber-500/90 px-2 py-0.5 rounded-md font-bold text-[11px] shadow-sm">
              <Award className="w-3 h-3 text-amber-200" />
              {item.reward}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category Tag & Security Question Alert */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
              categoryConfig?.color || 'bg-slate-100 text-slate-700'
            }`}>
              <CategoryIcon category={item.category} className="w-3.5 h-3.5" />
              {categoryConfig?.label}
            </span>

            {item.securityQuestion && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md" title="Ownership verification question set">
                <HelpCircle className="w-3 h-3" />
                Secured
              </span>
            )}
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Location & Drop-off Info */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            <MapPin className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                {location?.name || 'Campus Building'}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                {item.locationDetails}
              </p>
            </div>
          </div>

          {item.safeDropOffLocationId && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Safe Handover at Reception Desk</span>
            </div>
          )}
        </div>

        {/* Action Button Strip */}
        <div className="pt-2 flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickClaim(item);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
              isLost
                ? 'bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60'
                : 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
            }`}
          >
            {isLost ? (
              <>
                <MessageCircle className="w-3.5 h-3.5" />
                <span>I Found This</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Claim Item</span>
              </>
            )}
          </button>

          <button
            onClick={() => onOpenDetail(item)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="View Full Details"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
