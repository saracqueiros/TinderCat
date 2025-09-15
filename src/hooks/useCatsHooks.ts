import React from "react";

import { getCats, voteCat } from "../api";
import { Cat } from "../api/types";

export const useCatsHooks = () => {
  const [cats, setCats] = React.useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [hasInitialized, setHasInitialized] = React.useState(false);
  
  const currentCat = cats[currentIndex];
  const nextCat = cats[currentIndex + 1];

  const isFetchingRef = React.useRef(false);

  const fetchAndSet = React.useCallback(async (append: boolean) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);
    try {
      const newCats = await getCats(10);
      if (Array.isArray(newCats)) {
        setCats(prev => [...prev, ...newCats]);
        if (!hasInitialized) {
          setHasInitialized(true);
        } 
      }
    } catch (e: any) {
      setError(e ?? new Error("Failed to fetch cats"));
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [hasInitialized]);

  const refresh = React.useCallback(() => fetchAndSet(false), [fetchAndSet]);
  const loadMore = React.useCallback(() => fetchAndSet(true), [fetchAndSet]);

  const voteDislike = React.useCallback(() => {
    if (currentCat) {
      voteCat(currentCat.image?.id, currentCat.id, 0);
    }
  }, [currentCat]);
  
  const voteLike = React.useCallback(() => {
    if (currentCat) {
      voteCat(currentCat.image?.id, currentCat.id, 1);
    }
  }, [currentCat]);
  
  const advanceToNext = React.useCallback(() => {
    setCurrentIndex(prev => prev + 1);
  }, []);

  React.useEffect(() => {
    if (!hasInitialized) {
      refresh();
    }
  }, [refresh, hasInitialized]);

  return React.useMemo(() => ({ 
    cats, 
    currentCat,
    nextCat,
    currentIndex,
    loading: loading && !hasInitialized,
    error, 
    loadMore, 
    voteDislike,
    voteLike,
    advanceToNext
  }), [
    cats,
    currentCat,
    nextCat,
    currentIndex,
    loading,
    hasInitialized,
    error,
    loadMore,
    voteDislike,
    voteLike,
    advanceToNext
  ]);
};