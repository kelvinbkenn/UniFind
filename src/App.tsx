import React, { useState, useEffect, useMemo } from 'react';
import { 
  Item, 
  FilterState, 
  ItemType, 
  ClaimRequest, 
  Category 
} from './types';
import { INITIAL_MOCK_ITEMS, CAMPUS_LOCATIONS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { StatsBanner } from './components/StatsBanner';
import { FilterBar } from './components/FilterBar';
import { ItemCard } from './components/ItemCard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { PostItemModal } from './components/PostItemModal';
import { ClaimModal } from './components/ClaimModal';
import { ContactModal } from './components/ContactModal';
import { CampusMapModal } from './components/CampusMapModal';
import { SafeHandoverGuideModal } from './components/SafeHandoverGuideModal';
import { SmartMatchBanner } from './components/SmartMatchBanner';
import { ToastContainer, ToastMessage } from './components/Toast';
import { triggerConfetti } from './utils/helpers';
import { 
  SearchX, 
  PhoneCall
} from 'lucide-react';

const STORAGE_KEY = 'unifind_campus_items_v1';
const THEME_KEY = 'unifind_theme_v1';

export const App: React.FC = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Items State (loaded from LocalStorage or mock data)
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved items:', e);
      }
    }
    return INITIAL_MOCK_ITEMS;
  });

  // Filter State
  const [filter, setFilter] = useState<FilterState>({
    searchQuery: '',
    type: 'all',
    category: 'all',
    locationId: 'all',
    dateRange: 'all',
    sortBy: 'newest'
  });

  // Layout View Mode
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modals State
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postModalInitialType, setPostModalInitialType] = useState<ItemType>('lost');
  const [selectedDetailItem, setSelectedDetailItem] = useState<Item | null>(null);
  const [claimModalItem, setClaimModalItem] = useState<Item | null>(null);
  const [contactModalItem, setContactModalItem] = useState<Item | null>(null);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [safeGuideModalOpen, setSafeGuideModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply dark mode class to root HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [darkMode]);

  // Persist items to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Filtered & Sorted items calculation
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Type Filter
      if (filter.type === 'lost' && item.type !== 'lost') return false;
      if (filter.type === 'found' && item.type !== 'found') return false;
      if (filter.type === 'resolved' && item.status !== 'resolved') return false;

      // 2. Category Filter
      if (filter.category !== 'all' && item.category !== filter.category) return false;

      // 3. Campus Location Filter
      if (filter.locationId !== 'all' && item.locationId !== filter.locationId) return false;

      // 4. Search Query Filter
      if (filter.searchQuery.trim()) {
        const q = filter.searchQuery.toLowerCase();
        const loc = CAMPUS_LOCATIONS.find((l) => l.id === item.locationId);
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchLoc = loc?.name.toLowerCase().includes(q) || item.locationDetails.toLowerCase().includes(q);
        const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchFeatures = item.distinguishingFeatures?.toLowerCase().includes(q) || false;

        if (!matchTitle && !matchDesc && !matchLoc && !matchTag && !matchFeatures) {
          return false;
        }
      }

      // 5. Date Range Filter
      if (filter.dateRange !== 'all') {
        const itemDate = new Date(item.eventDate || item.dateReported).getTime();
        const now = Date.now();
        const diffHours = (now - itemDate) / (1000 * 60 * 60);

        if (filter.dateRange === 'today' && diffHours > 24) return false;
        if (filter.dateRange === '3days' && diffHours > 72) return false;
        if (filter.dateRange === 'week' && diffHours > 168) return false;
        if (filter.dateRange === 'month' && diffHours > 720) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'newest') {
        return new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime();
      }
      if (filter.sortBy === 'oldest') {
        return new Date(a.dateReported).getTime() - new Date(b.dateReported).getTime();
      }
      if (filter.sortBy === 'eventDateDesc') {
        return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
      }
      return 0;
    });
  }, [items, filter]);

  // Dynamic Item Counts
  const counts = useMemo(() => {
    const all = items.length;
    const lost = items.filter((i) => i.type === 'lost' && i.status !== 'resolved').length;
    const found = items.filter((i) => i.type === 'found' && i.status !== 'resolved').length;
    const resolved = items.filter((i) => i.status === 'resolved').length;
    
    const categories: Record<string, number> = {};
    items.forEach((i) => {
      categories[i.category] = (categories[i.category] || 0) + 1;
    });

    return { all, lost, found, resolved, categories };
  }, [items]);

  // Actions
  const handleOpenReportModal = (type: ItemType) => {
    setPostModalInitialType(type);
    setPostModalOpen(true);
  };

  const handlePostItem = (itemData: Omit<Item, 'id' | 'dateReported' | 'status' | 'claims'>) => {
    const newItem: Item = {
      ...itemData,
      id: `item-${Date.now()}`,
      dateReported: new Date().toISOString(),
      status: 'active',
      claims: []
    };

    setItems((prev) => [newItem, ...prev]);
    triggerConfetti();
    addToast(
      'success',
      itemData.type === 'lost' ? 'Lost Item Broadcasted' : 'Found Item Reported',
      `"${itemData.title}" is now active in the university directory.`
    );
  };

  const handleSubmitClaim = (claimData: Omit<ClaimRequest, 'id' | 'status' | 'submittedAt'>) => {
    const newClaim: ClaimRequest = {
      ...claimData,
      id: `claim-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    setItems((prev) =>
      prev.map((item) =>
        item.id === claimData.itemId
          ? {
              ...item,
              status: 'claim_pending',
              claims: [...(item.claims || []), newClaim]
            }
          : item
      )
    );

    addToast(
      'success',
      'Ownership Claim Submitted',
      'Your verification response has been sent to the finder / desk for review.'
    );
  };

  const handleSendMessage = (note: {
    senderName: string;
    senderEmail: string;
    message: string;
    suggestedLocation: string;
  }) => {
    addToast(
      'success',
      'Message Sent Safely',
      `Your note from ${note.senderName} was dispatched to the listing reporter.`
    );
  };

  const handleMarkResolved = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, status: 'resolved' } : item
      )
    );

    if (selectedDetailItem?.id === itemId) {
      setSelectedDetailItem((prev) => prev ? { ...prev, status: 'resolved' } : null);
    }

    triggerConfetti();
    addToast(
      'success',
      'Item Marked as Reunited! 🎉',
      'Congratulations on safely resolving this campus item.'
    );
  };

  const handleQuickClaim = (item: Item) => {
    if (item.type === 'lost') {
      setContactModalItem(item);
    } else {
      setClaimModalItem(item);
    }
  };

  const handleFilterUpdate = (newFilter: Partial<FilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleResetFilters = () => {
    setFilter({
      searchQuery: '',
      type: 'all',
      category: 'all',
      locationId: 'all',
      dateRange: 'all',
      sortBy: 'newest'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Top Navigation */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenReportModal={handleOpenReportModal}
        onOpenMapModal={() => setMapModalOpen(true)}
        onOpenSafeGuideModal={() => setSafeGuideModalOpen(true)}
        searchQuery={filter.searchQuery}
        onSearchChange={(query) => handleFilterUpdate({ searchQuery: query })}
        activeLostCount={counts.lost}
        activeFoundCount={counts.found}
        resolvedCount={counts.resolved}
      />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero & Quick Action Banner */}
        <StatsBanner
          onOpenReportModal={handleOpenReportModal}
          onSelectCategory={(cat: Category) => handleFilterUpdate({ category: cat })}
          onOpenMapModal={() => setMapModalOpen(true)}
        />

        {/* AI Smart Match Banner */}
        <SmartMatchBanner
          items={items}
          onOpenItemDetail={(item) => setSelectedDetailItem(item)}
        />

        {/* Filter and View Mode Controller */}
        <FilterBar
          filter={filter}
          onFilterChange={handleFilterUpdate}
          onResetFilters={handleResetFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          counts={counts}
        />

        {/* Listings Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Campus Directory</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </span>
            </h2>
          </div>

          {filteredItems.length === 0 ? (
            /* Empty State */
            <div className="py-16 px-4 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 mx-auto flex items-center justify-center">
                <SearchX className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No matching items found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  Try adjusting your search terms, changing the category, or expanding the date filter.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  Reset All Filters
                </button>
                <button
                  onClick={() => handleOpenReportModal('lost')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
                >
                  Report New Item
                </button>
              </div>
            </div>
          ) : (
            /* Grid or List Layout */
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-3'
            }>
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  viewMode={viewMode}
                  onOpenDetail={(i) => setSelectedDetailItem(i)}
                  onQuickClaim={handleQuickClaim}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Campus Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                  UF
                </div>
                <span className="font-extrabold text-base tracking-tight">UniFind Campus Network</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                An open campus initiative ensuring student ID cards, tech devices, books, and belongings 
                are safely tracked, verified, and returned to their rightful owners.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Official Safe Desks
              </h4>
              <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
                <li>• Main Library Circulation Desk</li>
                <li>• Student Union Information Kiosk</li>
                <li>• Campus Security &amp; Transit Center</li>
                <li>• Science &amp; Engineering Office</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Campus Security Assistance
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                For lost wallets with credit cards, laptops, or passports, contact Campus Police 24/7.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Hotline: (555) 911-0022</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p>© {new Date().getFullYear()} UniFind University Campus Network. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with care for University Students &amp; Staff
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PostItemModal
        isOpen={postModalOpen}
        initialType={postModalInitialType}
        onClose={() => setPostModalOpen(false)}
        onSubmit={handlePostItem}
      />

      <ItemDetailModal
        item={selectedDetailItem}
        allItems={items}
        onClose={() => setSelectedDetailItem(null)}
        onOpenClaim={(item) => {
          setSelectedDetailItem(null);
          setClaimModalItem(item);
        }}
        onOpenContact={(item) => {
          setSelectedDetailItem(null);
          setContactModalItem(item);
        }}
        onMarkResolved={handleMarkResolved}
        onSelectMatchItem={(item) => setSelectedDetailItem(item)}
      />

      <ClaimModal
        item={claimModalItem}
        onClose={() => setClaimModalItem(null)}
        onSubmitClaim={handleSubmitClaim}
      />

      <ContactModal
        item={contactModalItem}
        onClose={() => setContactModalItem(null)}
        onSendMessage={handleSendMessage}
      />

      <CampusMapModal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
        items={items}
        onSelectItem={(item) => setSelectedDetailItem(item)}
      />

      <SafeHandoverGuideModal
        isOpen={safeGuideModalOpen}
        onClose={() => setSafeGuideModalOpen(false)}
      />
    </div>
  );
};

export default App;
