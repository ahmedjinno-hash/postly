"use client";
import { useEffect, useRef } from "react";

const DRAFT_KEY = "postly-draft:v1";
const HISTORY_KEY = "postly-history:v1";
const MAX_HISTORY = 20;

export interface Draft {
  idea: string;
  platform: string;
  tone: string;
  count: number;
}

export interface HistoryEntry {
  id: string;
  date: string;
  idea: string;
  platform: string;
  tone: string;
  variations: string[];
}

export function useDraftPersistence(draft: Draft, onLoad: (d: Draft) => void) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try { onLoad(JSON.parse(saved)); } catch { /* ignore */ }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }, 600);
  }, [draft]);
}

export function appendHistory(entry: Omit<HistoryEntry, "id" | "date">) {
  const raw = localStorage.getItem(HISTORY_KEY);
  const list: HistoryEntry[] = raw ? JSON.parse(raw) : [];
  list.unshift({ ...entry, id: Date.now().toString(), date: new Date().toISOString() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, MAX_HISTORY)));
}

export function getHistory(): HistoryEntry[] {
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}
