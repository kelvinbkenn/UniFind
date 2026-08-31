import React from 'react';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Award,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Sparkles,
  HelpCircle,
  MessageSquare,
  User,
  ArrowRight,
  Check
} from 'lucide-react';
import { Item } from '../types';
import { CAMPUS_LOCATIONS, CATEGORIES_CONFIG } from '../data/mockData';
import { CategoryIcon } from './CategoryIcon';
import { findSmartMatches, formatRelativeTime } from '../utils/helpers';

interface ItemDetailModalProps {
  item: Item | null;
  allItems: Item[];
  onClose: () => void;
  onOpenClaim: (item: Item) => void;
  onOpenContact: (item: Item) => void;
  onMarkResolved: (itemId: string) => void;
  onSelectMatchItem: (item: Item) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  allItems,
  onClose,
  onOpenClaim,
  onOpenContact,
  onMarkResolved,
  onSelectMatchItem
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [copiedLink, setCopiedLink] = React.useState(false);

  if (!item) return null;

  const location = CAMPUS_LOCATIONS.find((l) => l.id === item.locationId);
  const categoryConfig = CATEGORIES_CONFIG.find((c) => c.id === item.category);
  const safeDropOff = item.safeDropOffLocationId 
    ? CAMPUS_LOCATIONS.find((l) => l.id === item.safeDropOffLocationId)
    : null;

  const isLost = item.type === 'lost';
  const isResolved = item.status === 'resolved';
  const isPending = item.status === 'claim_pending';

  const matches = findSmartMatches(item, allItems);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white shadow-sm ${
              isLost ? 'bg-rose-500' : 'bg-emerald-600'
            }`}>
              {isLost ? 'Lost Item' : 'Found Item'}
            </span>

            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${
              categoryConfig?.color || 'bg-slate-100 text-slate-700'
            }`}>
              <CategoryIcon category={item.category} className="w-3.5 h-3.5" />
              {categoryConfig?.label}
            </span>

            {isResolved && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-white shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Reunited with Owner
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
              title="Share listing link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Main Grid: Gallery & Core Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Gallery Column */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <img
                  src={item.images[selectedImageIndex] || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 text-white rounded-md text-[11px] font-mono">
                    {selectedImageIndex + 1} / {item.images.length}
                  </div>
                )}
              </div>

              {item.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {item.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-indigo-600 scale-95 ring-2 ring-indigo-500/30'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Status Banner */}
              {isResolved ? (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-900 dark:text-amber-300 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold">Item Successfully Returned!</p>
                    <p className="opacity-80">This case has been resolved and closed.</p>
                  </div>
                </div>
              ) : isPending ? (
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-900 dark:text-indigo-300 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold">A Claim is Currently Pending</p>
                    <p className="opacity-80">The finder / staff is reviewing ownership proof verification.</p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Right Details Column */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {item.title}
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Reported {formatRelativeTime(item.dateReported)} ({new Date(item.dateReported).toLocaleDateString()})</span>
                </p>
              </div>

              {/* Reward Badge */}
              {item.reward && (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-400/40 text-amber-900 dark:text-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400 block">Owner Offered Reward</span>
                      <strong className="text-sm font-extrabold">{item.reward}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Item Description
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  {item.description}
                </p>
              </div>

              {/* Distinguishing Features */}
              {item.distinguishingFeatures && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Distinguishing Marks / Details
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 font-mono">
                    {item.distinguishingFeatures}
                  </p>
                </div>
              )}

              {/* Location & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Location {isLost ? 'Lost' : 'Found'}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {location?.name || 'Campus Building'}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.locationDetails}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Event Date &amp; Time</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.eventDate}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Around {item.eventTime || 'Time unspecified'}
                  </p>
                </div>
              </div>

              {/* Safe Drop-off Information */}
              {safeDropOff && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-900 dark:text-emerald-200">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                        Deposited at Campus Safe Desk
                      </h5>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                        This item has been safely turned over to: <strong>{safeDropOff.safeDeskName}</strong>. You can verify and pick it up during front desk operating hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Question Prompt for Found Items */}
              {item.securityQuestion && (
                <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-950 dark:text-indigo-200">
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-indigo-900 dark:text-indigo-300">
                        Owner Verification Required
                      </h5>
                      <p className="text-xs text-indigo-700 dark:text-indigo-400 mt-0.5">
                        The finder set this verification question to prevent false claims: <br />
                        <span className="font-semibold italic text-slate-900 dark:text-white mt-1 block">
                          "{item.securityQuestion}"
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reporter Contact & Safety Advice */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-500" />
                <span>Reported By</span>
              </h5>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {item.reporterName} <span className="text-xs font-normal text-slate-500 capitalize">({item.reporterRole})</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Preferred Contact: <span className="font-semibold capitalize text-indigo-600 dark:text-indigo-400">{item.preferredContact.replace('_', ' ')}</span>
              </p>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700 sm:pl-4">
              <strong className="text-slate-700 dark:text-slate-300">Campus Safety Reminder:</strong>
              <span>Always arrange handovers at well-lit campus hubs, such as the Library or Student Center front desks.</span>
            </div>
          </div>

          {/* Smart Match Recommendations Section */}
          {matches.length > 0 && !isResolved && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Potential Matches in System ({matches.length})
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matches.slice(0, 2).map((m) => (
                  <div
                    key={m.item.id}
                    onClick={() => onSelectMatchItem(m.item)}
                    className="cursor-pointer p-3 rounded-2xl bg-amber-500/5 hover:bg-amber-500/10 border border-amber-300/40 dark:border-amber-500/20 transition-all flex items-center gap-3"
                  >
                    <img
                      src={m.item.images[0] || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=200&q=80'}
                      alt={m.item.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">
                          {m.score}% Match
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase">{m.item.type}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {m.item.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {m.matchedFields[0]}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
          <div>
            {!isResolved && (
              <button
                onClick={() => onMarkResolved(item.id)}
                className="px-4 py-2 text-xs font-bold text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl transition-colors inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mark as Reunited / Closed</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>

            {!isResolved && (
              <>
                {isLost ? (
                  <button
                    onClick={() => onOpenContact(item)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 transition-all inline-flex items-center gap-2 active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>I Found This Item!</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenClaim(item)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all inline-flex items-center gap-2 active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Claim this Item</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
