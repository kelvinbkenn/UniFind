import React from 'react';
import {
  X,
  ShieldCheck,
  Building,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { CAMPUS_LOCATIONS } from '../data/mockData';

interface SafeHandoverGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafeHandoverGuideModal: React.FC<SafeHandoverGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const safeDesks = CAMPUS_LOCATIONS.filter((l) => l.hasSafeDesk);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Campus Safe Desks &amp; Handover Guidelines
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official recommendations for securely reuniting lost belongings.
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
          {/* Key Guidelines Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Use Safe Desks</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Whenever possible, turn found items over to official building circulation desks or security kiosks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Verify Ownership</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Always ask claimants for specific details (lockscreen wallpaper, ID number, sticker colors) before handing items over.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Meet in Public</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                If conducting a direct student-to-student handover, meet during daylight in busy areas like the Student Center.
              </p>
            </div>
          </div>

          {/* List of Designated Safe Desks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-indigo-500" />
              <span>Official Campus Safe Drop-off &amp; Collection Desks</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {safeDesks.map((desk) => (
                <div
                  key={desk.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {desk.zone} Campus
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      8:00 AM - 10:00 PM
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                    {desk.safeDeskName}
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    Located in {desk.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency / High Value Items */}
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-rose-900 dark:text-rose-300">
                High-Value Items &amp; Government Documents
              </h5>
              <p className="text-xs text-rose-800 dark:text-rose-400 leading-relaxed">
                Found Passports, Wallets with cash over $100, high-end laptops, or prescription medications should immediately be deposited at the <strong>Campus Transit &amp; Police Station</strong> (24/7 Desk: 555-911-0022).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
