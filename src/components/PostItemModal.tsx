import React, { useState } from 'react';
import {
  X,
  Plus,
  Upload,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Clock,
  Award,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { Item, ItemType, Category } from '../types';
import { CAMPUS_LOCATIONS, CATEGORIES_CONFIG, PRESET_ITEM_IMAGES } from '../data/mockData';
import { CategoryIcon } from './CategoryIcon';

interface PostItemModalProps {
  isOpen: boolean;
  initialType: ItemType;
  onClose: () => void;
  onSubmit: (itemData: Omit<Item, 'id' | 'dateReported' | 'status' | 'claims'>) => void;
}

export const PostItemModal: React.FC<PostItemModalProps> = ({
  isOpen,
  initialType,
  onClose,
  onSubmit
}) => {
  const [type, setType] = useState<ItemType>(initialType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('id_cards');
  const [description, setDescription] = useState('');
  const [distinguishingFeatures, setDistinguishingFeatures] = useState('');
  const [locationId, setLocationId] = useState(CAMPUS_LOCATIONS[0].id);
  const [locationDetails, setLocationDetails] = useState('');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventTime, setEventTime] = useState('12:00 PM');
  const [selectedImage, setSelectedImage] = useState(PRESET_ITEM_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [reward, setReward] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [droppedAtSafeDesk, setDroppedAtSafeDesk] = useState(false);
  const [safeDropOffLocationId, setSafeDropOffLocationId] = useState(CAMPUS_LOCATIONS[0].id);
  
  // Reporter info
  const [reporterName, setReporterName] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [reporterRole, setReporterRole] = useState<'student' | 'staff' | 'faculty' | 'security'>('student');
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | 'in_app'>('in_app');
  const [tagInput, setTagInput] = useState('');

  // Update type if prop changes
  React.useEffect(() => {
    setType(initialType);
  }, [initialType]);

  // Update default image when category changes
  const handleCategoryChange = (newCat: Category) => {
    setCategory(newCat);
    const preset = PRESET_ITEM_IMAGES.find((p) => p.category === newCat);
    if (preset) {
      setSelectedImage(preset.url);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !reporterName.trim() || !reporterEmail.trim()) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    const tags = tagInput
      ? tagInput.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
      : [category, title.toLowerCase().split(' ')[0]];

    onSubmit({
      type,
      title: title.trim(),
      category,
      description: description.trim(),
      distinguishingFeatures: distinguishingFeatures.trim() || undefined,
      locationId,
      locationDetails: locationDetails.trim() || 'Campus area',
      eventDate,
      eventTime: eventTime.trim() || undefined,
      images: [selectedImage],
      reward: type === 'lost' && reward.trim() ? reward.trim() : undefined,
      securityQuestion: type === 'found' && securityQuestion.trim() ? securityQuestion.trim() : undefined,
      reporterName: reporterName.trim(),
      reporterEmail: reporterEmail.trim(),
      reporterPhone: reporterPhone.trim() || undefined,
      reporterRole,
      preferredContact,
      safeDropOffLocationId: type === 'found' && droppedAtSafeDesk ? safeDropOffLocationId : undefined,
      tags
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {type === 'lost' ? 'Report a Lost Belonging' : 'Report a Found Item'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Fill in accurate details to help campus security and students locate and identify the item.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Item Type Switch */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 block">
              Report Type *
            </label>
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
              <button
                type="button"
                onClick={() => setType('lost')}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  type === 'lost'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>I Lost Something</span>
              </button>

              <button
                type="button"
                onClick={() => setType('found')}
                className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  type === 'found'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>I Found Something</span>
              </button>
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-7 space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Item Title / Headline *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Silver Apple AirPods Pro in White Case"
                className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-5 space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as Category)}
                className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:outline-none focus:border-indigo-500 cursor-pointer font-medium"
              >
                {CATEGORIES_CONFIG.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Detailed Description *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe color, model, condition, contents, or where it was discovered/misplaced..."
              className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {/* Distinguishing Features */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Distinguishing Marks &amp; Features (Optional)
              </label>
              <span className="text-[11px] text-slate-400">Scratches, stickers, serials</span>
            </div>
            <input
              type="text"
              value={distinguishingFeatures}
              onChange={(e) => setDistinguishingFeatures(e.target.value)}
              placeholder="e.g. Small NASA sticker, left earbud has faint scratch on tip"
              className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Location & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>Campus Location *</span>
              </label>
              <select
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:outline-none focus:border-indigo-500 font-medium"
              >
                {CAMPUS_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} ({loc.zone} Campus)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Exact Spot / Room Detail *
              </label>
              <input
                type="text"
                required
                value={locationDetails}
                onChange={(e) => setLocationDetails(e.target.value)}
                placeholder="e.g. 2nd floor quiet room, table near window 4"
                className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>Date {type === 'lost' ? 'Lost' : 'Found'} *</span>
              </label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Approximate Time</span>
              </label>
              <input
                type="text"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                placeholder="e.g. 10:30 AM or Afternoon"
                className="w-full text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Photo Selection / Upload */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Item Photo / Image *</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">Select a preset or upload your photo</span>
            </label>

            {/* Selected Image Preview */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-900 shrink-0">
                <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 space-y-2 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold flex items-center gap-1.5 hover:bg-indigo-100 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from Device</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <span className="text-xs text-slate-400">or pick from presets below</span>
                </div>

                {/* Preset Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {PRESET_ITEM_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(preset.url)}
                      title={preset.label}
                      className={`relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImage === preset.url
                          ? 'border-indigo-600 ring-2 ring-indigo-400/40'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Options: Lost (Reward) vs Found (Security Question & Safe Desk) */}
          {type === 'lost' ? (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 space-y-2">
              <label className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Optional Reward for Finder</span>
              </label>
              <input
                type="text"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="e.g. $25 Cash or Free Lunch at Student Union"
                className="w-full text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700/60 text-slate-900 dark:text-white p-2.5 focus:outline-none focus:border-amber-500"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Security Question */}
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 space-y-2">
                <label className="text-xs font-bold text-indigo-950 dark:text-indigo-300 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  <span>Security Verification Question (To verify real owner)</span>
                </label>
                <input
                  type="text"
                  value={securityQuestion}
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                  placeholder="e.g. What sticker is on the back? What is the lockscreen wallpaper?"
                  className="w-full text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-700/60 text-slate-900 dark:text-white p-2.5 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Safe Drop-off Option */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={droppedAtSafeDesk}
                    onChange={(e) => setDroppedAtSafeDesk(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>I dropped this item off at a Campus Safe Desk / Security</span>
                  </span>
                </label>

                {droppedAtSafeDesk && (
                  <select
                    value={safeDropOffLocationId}
                    onChange={(e) => setSafeDropOffLocationId(e.target.value)}
                    className="w-full text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 text-slate-900 dark:text-white p-2.5"
                  >
                    {CAMPUS_LOCATIONS.filter((l) => l.hasSafeDesk).map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.safeDeskName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          )}

          {/* Reporter Information */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Your Contact Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  University Email *
                </label>
                <input
                  type="email"
                  required
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="e.g. amorgan@student.campus.edu"
                  className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Preferred Contact
                </label>
                <select
                  value={preferredContact}
                  onChange={(e) => setPreferredContact(e.target.value as any)}
                  className="w-full text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-2.5 font-medium"
                >
                  <option value="in_app">UniFind In-App Direct Claim</option>
                  <option value="email">Direct Campus Email</option>
                  <option value="phone">Phone / SMS</option>
                </select>
              </div>
            </div>
          </div>
        </form>

        {/* Modal Actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-95 flex items-center gap-2 ${
              type === 'lost'
                ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/25'
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Publish {type === 'lost' ? 'Lost Report' : 'Found Item'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
