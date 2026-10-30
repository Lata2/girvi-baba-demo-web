import { useSyncExternalStore } from 'react';
import type { ItemId } from '@/content/home';

/**
 * Tiny shared store for "which item is the visitor interested in?".
 * Hero chips and item cards write to it; the loan estimate form reads it.
 */
let current: ItemId = 'mobile';
const listeners = new Set<() => void>();

export function selectItem(id: ItemId) {
  if (id === current) return;
  current = id;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSelectedItem(): ItemId {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => current,
  );
}
