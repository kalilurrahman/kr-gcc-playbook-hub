import { useState, useEffect, useCallback } from 'react';

const BOOKMARKS_KEY = 'gcc-playbook-bookmarks';
const POSITION_KEY = 'gcc-playbook-position';
const FONT_KEY = 'gcc-playbook-font-size';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = useCallback((chapterId: string) => {
    setBookmarks(prev =>
      prev.includes(chapterId) ? prev.filter(id => id !== chapterId) : [...prev, chapterId]
    );
  }, []);

  const isBookmarked = useCallback((chapterId: string) => bookmarks.includes(chapterId), [bookmarks]);

  return { bookmarks, toggleBookmark, isBookmarked };
}

export function useReadingPosition() {
  const savePosition = useCallback((chapterIdx: number) => {
    localStorage.setItem(POSITION_KEY, String(chapterIdx));
  }, []);

  const getLastPosition = useCallback((): number | null => {
    const stored = localStorage.getItem(POSITION_KEY);
    return stored !== null ? parseInt(stored, 10) : null;
  }, []);

  return { savePosition, getLastPosition };
}

export function useFontSize() {
  const [fontSize, setFontSize] = useState(() => {
    try {
      const stored = localStorage.getItem(FONT_KEY);
      return stored ? parseInt(stored, 10) : 14;
    } catch { return 14; }
  });

  useEffect(() => {
    localStorage.setItem(FONT_KEY, String(fontSize));
  }, [fontSize]);

  return { fontSize, setFontSize };
}
