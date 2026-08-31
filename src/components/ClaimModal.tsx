import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  HelpCircle,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { Item, ClaimRequest } from '../types';
import { CAMPUS_LOCATIONS } from '../data/mockData';

interface ClaimModalProps {
  item: Item | null;
  onClose: () => void;
  onSubmitClaim: (claim: Omit<ClaimRequest, 'id' | 'status' | 'submittedAt'>) => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({
  item,
  onClose,
  onSubmitClaim
}) => {
  const [claimantName, setClaimantName] = useState('');
  const [claimantEmail, setClaimantEmail] = useState('');
  const [claimantPhone, setClaimantPhone] = useState('');
  const [studentId, setStudentId] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [ownershipProof, setOwnershipProof] = useState('');
  const [handoverLocationId, setHandoverLocationId] = useState(
    item?.safeDropOffLocationId || CAMPUS_LOCATIONS[0].id
  );
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Tomorrow 12:00 PM - 2:00 PM');

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimantName.trim() || !claimantEmail.trim() || !ownershipProof.trim()) {
      alert('Please fill out your name, email, and proof of ownership.');
      return;
    }

    if (item.securityQuestion && !securityAnswer.trim()) {
      alert('Please provide an answer to the verification question.');
      return;
    }

    onSubmitClaim({
      itemId: item.id,
      claimantName: claimantName.trim(),
      claimantEmail: claimantEmail.trim(),
      claimantPhone: claimantPhone.trim() || undefined,
      studentId: studentId.trim() || undefined,
      ownershipProof: ownershipProof.trim(),
      securityAnswer: securityAnswer.trim() || undefined,
      handoverLocationId,
      preferredTimeSlot
    });

    onClose();
  };

  const safeLocations = CAMPUS_LOCATIONS.filter((l) => l.hasSafeDesk);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Submit Ownership Claim
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Provide verifying details to reclaim this item safely.
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

        {/* Claim Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1">
          {/* Target Item Overview Card */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
            <img
              src={item.images[0] || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=200&q=80'}
              alt={item.title}
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Claiming Found Item
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 truncate">
                Reported by {item.reporterName} ({item.reporterRole})
              </p>
            </div>
          </div>

          {/* Verification Question (if set) */}
          {item.securityQuestion && (
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 space-y-2">
              <div className="flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                    Security Verification Question *
                  </h5>
                  <p className="text-xs text-indigo-800 dark:text-indigo-300 font-semibold italic mt-0.5">
                    "{item.securityQuestion}"
                  </p>
                </div>
              </div>

              <input
                type="text"
                required
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                placeholder="Enter your answer to verify you are the real owner..."
                className="w-full text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700 text-slate-900 dark:text-white p-2.5 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {/* Proof of Ownership / Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Proof of Ownership / Distinguishing Details *</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">Private to staff &amp; finder</span>
            </label>
            <textarea
              required
              rows={3}
              value={ownershipProof}
              onChange={(e) => setOwnershipProof(e.target.value)}
              placeholder="Describe unique details not mentioned in public listing (e.g. lock screen photo, stickers, contents inside, exact purchase date or serial number)..."
              className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {/* Claimant Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={claimantName}
                onChange={(e) => setClaimantName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-2.5"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Student ID Number (Optional)
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. STU-98412"
                className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-2.5"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                University Email *
              </label>
              <input
                type="email"
                required
                value={claimantEmail}
                onChange={(e) => setClaimantEmail(e.target.value)}
                placeholder="e.g. amorgan@student.campus.edu"
                className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-2.5"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Contact Phone / SMS
              </label>
              <input
                type="tel"
                value={claimantPhone}
                onChange={(e) => setClaimantPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-2.5"
              />
            </div>
          </div>

          {/* Handover Safe Spot & Preferred Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>Preferred Handover Desk</span>
              </label>
              <select
                value={handoverLocationId}
                onChange={(e) => setHandoverLocationId(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-2.5 font-medium"
              >
                {safeLocations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.safeDeskName || loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Pickup Time Availability</span>
              </label>
              <input
                type="text"
                value={preferredTimeSlot}
                onChange={(e) => setPreferredTimeSlot(e.target.value)}
                placeholder="e.g. Today 3-5pm, or Mon 10am"
                className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-2.5"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Upon submission, the reporter/desk staff will review your claim and you will receive email confirmation.</span>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25 transition-all flex items-center gap-2 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit Verification Claim</span>
          </button>
        </div>
      </div>
    </div>
  );
};
