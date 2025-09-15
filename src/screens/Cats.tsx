import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import CatCard from "../components/CatCard";
import DecisionButtons from "../components/DecisionButtons";

import { useCatsHooks } from "../hooks/useCatsHooks";
import SwipeDeck, { SwipeDeckRef } from "../components/SwipeDeck";
import { Cat } from "../api/types";

const Cats = () => {
  const { cats, loading, loadMore, voteDislike, voteLike, advanceToNext } = useCatsHooks();
  const swipeDeckRef = React.useRef<SwipeDeckRef>(null);

  // Memoize the cats array to prevent unnecessary re-renders
  const memoizedCats = React.useMemo(() => cats, [cats.length, cats[0]?.id]);

  const renderCard = React.useCallback((item: Cat) => (
    <CatCard cat={item} />
  ), []);


  const handleDislikePress = React.useCallback(() => {
    swipeDeckRef.current?.swipeLeft();
    advanceToNext();
  }, []);

  const handleLikePress = React.useCallback(() => {
    swipeDeckRef.current?.swipeRight();
    advanceToNext();
  }, []);

  if (loading && cats.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cats.length > 0 && (
        <View style={styles.swipeDeckContainer}>
          <SwipeDeck
            ref={swipeDeckRef}
            data={memoizedCats}
            renderCard={renderCard}
            onSwipeLeft={() => {
              voteDislike();
            }}
            onSwipeRight={() => {
              voteLike();
            }}
            onEndReached={loadMore}
          />
        </View>
      )}
      {cats.length > 0 && <DecisionButtons onDislikePress={handleDislikePress} onLikePress={handleLikePress} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeDeckContainer: {
    height: '55%',
    paddingVertical: 30,
  },
});

export default Cats;
