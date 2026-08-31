import confetti from 'canvas-confetti';
import { Item, MatchScore } from '../types';

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
  
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#3b82f6']
  });
}

/**
 * Intelligent matching algorithm between a target item (e.g., a lost item)
 * and all opposing items (e.g., found items)
 */
export function findSmartMatches(targetItem: Item, allItems: Item[]): MatchScore[] {
  const opposingType = targetItem.type === 'lost' ? 'found' : 'lost';
  const candidates = allItems.filter(
    (item) => item.type === opposingType && item.id !== targetItem.id && item.status !== 'resolved'
  );

  const tokenize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2);

  const targetTokens = new Set([
    ...tokenize(targetItem.title),
    ...tokenize(targetItem.description),
    ...(targetItem.distinguishingFeatures ? tokenize(targetItem.distinguishingFeatures) : []),
    ...targetItem.tags.map((t) => t.toLowerCase())
  ]);

  const matches: MatchScore[] = [];

  for (const item of candidates) {
    let score = 0;
    const matchedFields: string[] = [];

    // 1. Exact Category match (+40 points)
    if (item.category === targetItem.category) {
      score += 40;
      matchedFields.push('Same Category');
    }

    // 2. Same Campus Location (+30 points)
    if (item.locationId === targetItem.locationId) {
      score += 30;
      matchedFields.push('Same Campus Location');
    }

    // 3. Keyword / Token Overlaps (+10 per meaningful common word up to 30)
    const itemTokens = new Set([
      ...tokenize(item.title),
      ...tokenize(item.description),
      ...(item.distinguishingFeatures ? tokenize(item.distinguishingFeatures) : []),
      ...item.tags.map((t) => t.toLowerCase())
    ]);

    const commonTokens: string[] = [];
    targetTokens.forEach((token) => {
      // Ignore very generic words
      if (['lost', 'found', 'campus', 'item', 'with', 'this', 'that', 'from', 'near'].includes(token)) {
        return;
      }
      if (itemTokens.has(token)) {
        commonTokens.push(token);
      }
    });

    if (commonTokens.length > 0) {
      const keywordScore = Math.min(commonTokens.length * 12, 35);
      score += keywordScore;
      matchedFields.push(`Matched keywords: "${commonTokens.slice(0, 3).join(', ')}"`);
    }

    // 4. Date Proximity (+10 points if event dates within 3 days)
    if (targetItem.eventDate && item.eventDate) {
      const targetTime = new Date(targetItem.eventDate).getTime();
      const itemTime = new Date(item.eventDate).getTime();
      const diffDays = Math.abs(targetTime - itemTime) / (1000 * 60 * 60 * 24);
      if (diffDays <= 3) {
        score += 10;
        matchedFields.push('Reported around same date');
      }
    }

    if (score >= 45) {
      matches.push({
        item,
        score: Math.min(score, 99),
        matchedFields
      });
    }
  }

  return matches.sort((a, b) => b.score - a.score);
}
