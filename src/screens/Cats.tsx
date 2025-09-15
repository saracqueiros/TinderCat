import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useCatsHooks } from "../hooks/useCatsHooks";
import CatCard from "../components/CatCard";
const Cats = () => {
  const { cats, loading, error } = useCatsHooks();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {cats.length > 0 && <CatCard cat={cats[0]} />}
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
