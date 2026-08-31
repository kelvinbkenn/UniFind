import React from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  PlusCircle, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface StatsBannerProps {
  onOpenReportModal: (type: 'lost' | 'found') => void;
  onSelectCategory: (cat: any) => void;
  onOpenMapModal: () => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  onOpenReportModal,
  onSelectCategory,
  onOpenMapModal,
}) => {
  const quickTags = [
    { label: 'Student ID', cat: 'id_cards' },
    { label: 'AirPods / Audio', cat: 'electronics' },
    { label: 'Hydro Flask', cat: 'bottles' },
    { label: 'Dorm Keys', cat: 'keys_wallets' },
    { label: 'Textbooks', cat: 'books' },
    { label: 'Backpack', cat: 'bags' }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 shadow-2xl border border-indigo-500/20 mb-8">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Hero Copy & Quick Tags */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-400/30 text-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Official University Lost &amp; Found Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
            Lost something on campus? <br />
            <span className="bg-gradient-to-r from-amber-300 via-indigo-200 to-white bg-clip-text text-transparent">
              Let's get it back to you.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            A centralized, community-driven platform for reporting misplaced student ID cards, 
            electronics, textbooks, and personal belongings across all campus halls, libraries, and facilities.
          </p>

          {/* Quick Filter Tags */}
          <div className="pt-1">
            <span className="text-xs text-slate-400 font-medium block mb-2">Common items searched today:</span>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => (
                <button
                  key={tag.label}
                  onClick={() => onSelectCategory(tag.cat)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 transition-all hover:scale-105 active:scale-95"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Interactive CTA Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
          {/* Found Something Card */}
          <div 
            onClick={() => onOpenReportModal('found')}
            className="group cursor-pointer p-4 sm:p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-emerald-400/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 transform hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <PlusCircle className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                Good Samaritan
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-3 group-hover:text-emerald-300 transition-colors">
              I Found an Item
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Post details and drop off at campus safe desks to reunite it with its student owner.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mt-3">
              <span>Post Found Item</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Lost Something Card */}
          <div 
            onClick={() => onOpenReportModal('lost')}
            className="group cursor-pointer p-4 sm:p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-rose-400/50 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/10 transform hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800/60">
                Instant Alert
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-3 group-hover:text-rose-300 transition-colors">
              I Lost an Item
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Create a listing with location details and set an optional reward to broadcast to students.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 mt-3">
              <span>Post Lost Report</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
