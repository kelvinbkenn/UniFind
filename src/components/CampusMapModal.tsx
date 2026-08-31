import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Building,
  ChevronRight,
  Compass,
  Sparkles
} from 'lucide-react';
import { Item } from '../types';
import { CAMPUS_LOCATIONS } from '../data/mockData';

interface CampusMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  onSelectItem: (item: Item) => void;
}

export const CampusMapModal: React.FC<CampusMapModalProps> = ({
  isOpen,
  onClose,
  items,
  onSelectItem
}) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>(CAMPUS_LOCATIONS[0].id);
  const [selectedZone, setSelectedZone] = useState<string>('All');

  if (!isOpen) return null;

  const selectedLoc = CAMPUS_LOCATIONS.find((l) => l.id === selectedLocationId);
  
  // Calculate item counts per location
  const locationStats = CAMPUS_LOCATIONS.map((loc) => {
    const locItems = items.filter((i) => i.locationId === loc.id && i.status !== 'resolved');
    const lostCount = locItems.filter((i) => i.type === 'lost').length;
    const foundCount = locItems.filter((i) => i.type === 'found').length;
    return {
      ...loc,
      lostCount,
      foundCount,
      totalCount: locItems.length,
      items: locItems
    };
  });

  const activeStats = locationStats.find((l) => l.id === selectedLocationId);

  const zones = ['All', 'North', 'Central', 'South', 'East'];

  const filteredLocations = selectedZone === 'All' 
    ? locationStats 
    : locationStats.filter((l) => l.zone === selectedZone);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Interactive Campus Lost &amp; Found Map
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Explore building hotspots and designated safe exchange desks.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Zone Filters */}
        <div className="px-6 py-2.5 bg-slate-100/70 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Campus Zone:
          </span>
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedZone === zone
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {zone} {zone !== 'All' && 'Campus'}
            </button>
          ))}
        </div>

        {/* Content: Map Area & Location Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-y-auto flex-1">
          {/* Map Representation (Stylized vector campus board) */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4 border border-slate-700 shadow-inner overflow-hidden flex items-center justify-center">
              {/* Campus Grid Pathways */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Campus Roads / Paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 stroke-indigo-400/40 stroke-2" fill="none">
                <line x1="50%" y1="10%" x2="50%" y2="90%" strokeDasharray="4 4" />
                <line x1="10%" y1="50%" x2="90%" y2="50%" strokeDasharray="4 4" />
                <circle cx="50%" cy="50%" r="30%" strokeDasharray="6 6" />
              </svg>

              {/* Location Pins */}
              {locationStats.map((loc) => {
                const isSelected = loc.id === selectedLocationId;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id)}
                    style={{
                      left: `${loc.coordinates.x}%`,
                      top: `${loc.coordinates.y}%`
                    }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-20 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    <div className={`relative p-2.5 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-400/40 scale-105 shadow-indigo-500/50'
                        : loc.hasSafeDesk
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                        : 'bg-slate-800 text-slate-200 border border-slate-600 hover:bg-slate-700'
                    }`}>
                      {loc.hasSafeDesk ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-200" />
                      ) : (
                        <Building className="w-4 h-4" />
                      )}

                      {/* Floating Badge with Active Item Count */}
                      {loc.totalCount > 0 && (
                        <span className={`absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-black shadow-md ${
                          loc.lostCount > 0 && loc.foundCount > 0
                            ? 'bg-amber-400 text-slate-950'
                            : loc.lostCount > 0
                            ? 'bg-rose-500 text-white'
                            : 'bg-emerald-400 text-slate-950'
                        }`}>
                          {loc.totalCount}
                        </span>
                      )}
                    </div>

                    {/* Pin Label Hover Tooltip */}
                    <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-xl border border-slate-700">
                      {loc.name}
                    </div>
                  </button>
                );
              })}

              {/* Map Legend */}
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700 text-[11px] text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>Safe Handover Station</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span>Lost Item Hotspot</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Click any campus pin above or select from the list to view listings in that building.
            </p>
          </div>

          {/* Right Inspector: Selected Location Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            {activeStats && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {activeStats.zone} Campus Zone ({activeStats.shortCode})
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                        {activeStats.name}
                      </h4>
                    </div>
                    {activeStats.hasSafeDesk && (
                      <span className="p-1.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0" title="Designated Safe Desk Available">
                        <ShieldCheck className="w-5 h-5" />
                      </span>
                    )}
                  </div>

                  {activeStats.hasSafeDesk && (
                    <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/40 text-xs text-emerald-900 dark:text-emerald-300">
                      <strong className="block font-bold">Official Safe Desk:</strong>
                      <span>{activeStats.safeDeskName}</span>
                    </div>
                  )}

                  {/* Count summary */}
                  <div className="grid grid-cols-2 gap-2 mt-3 text-center">
                    <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
                      <span className="text-base font-black text-rose-600 dark:text-rose-400">
                        {activeStats.lostCount}
                      </span>
                      <span className="text-[11px] block font-semibold text-rose-700 dark:text-rose-300">
                        Lost Reported
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                        {activeStats.foundCount}
                      </span>
                      <span className="text-[11px] block font-semibold text-emerald-700 dark:text-emerald-300">
                        Found Waiting
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items in this location */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Active Items at this Location ({activeStats.items.length})
                  </h5>

                  {activeStats.items.length === 0 ? (
                    <div className="p-6 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                      <Sparkles className="w-6 h-6 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">No active unresolved items currently reported here.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {activeStats.items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            onClose();
                            onSelectItem(item);
                          }}
                          className="cursor-pointer p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition-all flex items-center gap-3 group"
                        >
                          <img
                            src={item.images[0] || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=200&q=80'}
                            alt={item.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase text-white ${
                                item.type === 'lost' ? 'bg-rose-500' : 'bg-emerald-600'
                              }`}>
                                {item.type}
                              </span>
                              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              {item.locationDetails}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-colors"
          >
            Close Map
          </button>
        </div>
      </div>
    </div>
  );
};
