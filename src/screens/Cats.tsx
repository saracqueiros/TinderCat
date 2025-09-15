import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import CatCard from "../components/CatCard";
import DecisionButtons from "../components/DecisionButtons";

import { useCatsHooks } from "../hooks/useCatsHooks";
import SwipeDeck from "../components/SwipeDeck";
import { Cat } from "../api/types";

const Cats = () => {
  const { cats, loading } = useCatsHooks();
  const renderCard = React.useMemo(
    () => (item: Cat) => <CatCard cat={item} />, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
     {cats.length > 0 && (
        <View style={styles.swipeDeckContainer}>
          <SwipeDeck
            data={cats}
            renderCard={(item) => renderCard(item)}
            onSwipeLeft={() => {}}
            onSwipeRight={() => {}}
          />
        </View>
      )}
      {cats.length > 0 && <DecisionButtons onDislikePress={() => {}} onLikePress={() => {}} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1 ,
    justifyContent: 'center',
    paddingHorizontal: 10,    
  },
  swipeDeckContainer: {
    height: '55%',
    paddingVertical: 30,
  },
});

export default Cats;
 