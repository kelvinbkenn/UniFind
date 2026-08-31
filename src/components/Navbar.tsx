import React from 'react';
import { 
  Compass, 
  PlusCircle, 
  Search, 
  Moon, 
  Sun, 
  ShieldCheck, 
  MapPin,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenReportModal: (type: 'lost' | 'found') => void;
  onOpenMapModal: () => void;
  onOpenSafeGuideModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeLostCount: number;
  activeFoundCount: number;
  resolvedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenReportModal,
  onOpenMapModal,
  onOpenSafeGuideModal,
  searchQuery,
  onSearchChange,
  activeLostCount,
  activeFoundCount,
  resolvedCount
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 dark:from-indigo-400 dark:via-indigo-300 dark:to-white bg-clip-text text-transparent">
                  UniFind
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                  Campus Safe Hub
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                Centralized Campus Lost &amp; Found
              </p>
            </div>
          </div>

          {/* Center Search Input */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Quick search (e.g. 'AirPods', 'Hydro Flask', 'Library')..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Campus Map Button */}
            <button
              onClick={onOpenMapModal}
              title="View Campus Drop-off Map"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <MapPin className="w-4 h-4 text-indigo-500" />
              <span className="hidden lg:inline">Campus Map</span>
            </button>

            {/* Safe Guide Button */}
            <button
              onClick={onOpenSafeGuideModal}
              title="Safe Handover & Campus Security Desks"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="hidden xl:inline">Safe Desks</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Post Lost Button */}
            <button
              onClick={() => onOpenReportModal('lost')}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-all shadow-sm active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>Report Lost</span>
            </button>

            {/* Post Found Button */}
            <button
              onClick={() => onOpenReportModal('found')}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 transition-all active:scale-95 hover:shadow-indigo-600/35"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Found</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-header Quick Banner */}
      <div className="bg-slate-50/70 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/80 px-4 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <strong className="text-slate-700 dark:text-slate-200">{activeLostCount}</strong> Lost Items Looking for Owners
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <strong className="text-slate-700 dark:text-slate-200">{activeFoundCount}</strong> Found Items Waiting in Campus
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <strong className="text-slate-700 dark:text-slate-200">{resolvedCount}</strong> Items Successfully Reunited
            </span>
          </div>
          <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            Campus Security Info Line: (555) 911-0022
          </div>
        </div>
      </div>
    </header>
  );
};
