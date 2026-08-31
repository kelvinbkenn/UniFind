import React from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  X, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { Category, FilterState } from '../types';
import { CATEGORIES_CONFIG, CAMPUS_LOCATIONS } from '../data/mockData';
import { CategoryIcon } from './CategoryIcon';

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  onResetFilters: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  counts: {
    all: number;
    lost: number;
    found: number;
    resolved: number;
    categories: Record<string, number>;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  onResetFilters,
  viewMode,
  onViewModeChange,
  counts
}) => {
  const isFiltered = 
    filter.searchQuery !== '' || 
    filter.type !== 'all' || 
    filter.category !== 'all' || 
    filter.locationId !== 'all' || 
    filter.dateRange !== 'all';

  return (
    <div className="space-y-4 mb-8">
      {/* Primary Type Tabs + View Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Type Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-800/80 rounded-2xl w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => onFilterChange({ type: 'all' })}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              filter.type === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-500" />
            <span>All Listings</span>
            <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => onFilterChange({ type: 'lost' })}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              filter.type === 'lost'
                ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${filter.type === 'lost' ? 'bg-white' : 'bg-rose-500'}`} />
            <span>Lost Items</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
              filter.type === 'lost' ? 'bg-rose-600 text-white' : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
            }`}>
              {counts.lost}
            </span>
          </button>

          <button
            onClick={() => onFilterChange({ type: 'found' })}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              filter.type === 'found'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${filter.type === 'found' ? 'bg-white' : 'bg-emerald-500'}`} />
            <span>Found Items</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
              filter.type === 'found' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
            }`}>
              {counts.found}
            </span>
          </button>

          <button
            onClick={() => onFilterChange({ type: 'resolved' })}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              filter.type === 'resolved'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-amber-500'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reunited</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
              filter.type === 'resolved' ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              {counts.resolved}
            </span>
          </button>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}

          <div className="flex items-center bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-xl">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Horizontal Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
        <button
          onClick={() => onFilterChange({ category: 'all' })}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
            filter.category === 'all'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
        >
          All Categories
        </button>

        {CATEGORIES_CONFIG.map((cat) => {
          const isSelected = filter.category === cat.id;
          const catCount = counts.categories[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ category: cat.id as Category })}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <CategoryIcon category={cat.id} className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}>
                {catCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Filter Controls: Location, Date Range, Sort By */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-white/70 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm">
        {/* Mobile Search Bar (visible on small screens) */}
        <div className="md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filter.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search items, keywords..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Location Dropdown */}
        <div className="relative">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-indigo-500" />
            <span>Campus Location</span>
          </label>
          <select
            value={filter.locationId}
            onChange={(e) => onFilterChange({ locationId: e.target.value })}
            className="w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 py-2 px-3 focus:outline-none focus:border-indigo-500 cursor-pointer font-medium"
          >
            <option value="all">📍 All Campus Buildings &amp; Grounds</option>
            {CAMPUS_LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} ({loc.zone} Zone)
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Dropdown */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-indigo-500" />
            <span>Date Range</span>
          </label>
          <select
            value={filter.dateRange}
            onChange={(e) => onFilterChange({ dateRange: e.target.value as any })}
            className="w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 py-2 px-3 focus:outline-none focus:border-indigo-500 cursor-pointer font-medium"
          >
            <option value="all">🗓️ Any Time</option>
            <option value="today">Today (Past 24 Hours)</option>
            <option value="3days">Past 3 Days</option>
            <option value="week">Past 7 Days</option>
            <option value="month">Past 30 Days</option>
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3 text-indigo-500" />
            <span>Sort Listings</span>
          </label>
          <select
            value={filter.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
            className="w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 py-2 px-3 focus:outline-none focus:border-indigo-500 cursor-pointer font-medium"
          >
            <option value="newest">⚡ Newly Reported First</option>
            <option value="eventDateDesc">📅 Event Date (Recent Lost/Found)</option>
            <option value="oldest">⏳ Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};
