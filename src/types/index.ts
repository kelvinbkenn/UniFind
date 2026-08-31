export type ItemType = 'lost' | 'found';

export type ItemStatus = 'active' | 'claim_pending' | 'resolved';

export type Category = 
  | 'id_cards'
  | 'electronics'
  | 'books'
  | 'bottles'
  | 'keys_wallets'
  | 'bags'
  | 'clothing'
  | 'other';

export interface CampusLocation {
  id: string;
  name: string;
  shortCode: string;
  zone: 'North' | 'Central' | 'South' | 'East' | 'West';
  hasSafeDesk: boolean;
  safeDeskName?: string;
  coordinates: { x: number; y: number }; // percentage on interactive map (0-100)
}

export interface ClaimRequest {
  id: string;
  itemId: string;
  claimantName: string;
  claimantEmail: string;
  claimantPhone?: string;
  studentId?: string;
  ownershipProof: string;
  securityAnswer?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  handoverLocationId: string;
  preferredTimeSlot: string;
}

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  category: Category;
  description: string;
  distinguishingFeatures?: string;
  locationId: string;
  locationDetails: string; // e.g. "3rd Floor Quiet Study Area, Table #14"
  dateReported: string; // ISO string
  eventDate: string; // Date lost/found (YYYY-MM-DD)
  eventTime?: string; // Time lost/found e.g. "14:30"
  status: ItemStatus;
  images: string[];
  reward?: string; // For lost items, e.g. "$25 or Free Coffee"
  securityQuestion?: string; // For found items to verify ownership
  reporterName: string;
  reporterEmail: string;
  reporterPhone?: string;
  reporterRole: 'student' | 'staff' | 'faculty' | 'security';
  preferredContact: 'email' | 'phone' | 'in_app';
  safeDropOffLocationId?: string; // If found item is deposited at campus security/library desk
  tags: string[];
  claims?: ClaimRequest[];
}

export interface FilterState {
  searchQuery: string;
  type: 'all' | 'lost' | 'found' | 'resolved';
  category: 'all' | Category;
  locationId: 'all' | string;
  dateRange: 'all' | 'today' | '3days' | 'week' | 'month';
  sortBy: 'newest' | 'oldest' | 'eventDateDesc';
}

export interface MatchScore {
  item: Item;
  score: number;
  matchedFields: string[];
}
