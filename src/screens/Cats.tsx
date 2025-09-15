import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import CatCard from "../components/CatCard";
import DecisionButtons from "../components/DecisionButtons";

import { useCatsHooks } from "../hooks/useCatsHooks";

const Cats = () => {
  const { cats, loading, error } = useCatsHooks();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {cats.length > 0 && <CatCard cat={cats[0]} />}
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
});

export default Cats;
