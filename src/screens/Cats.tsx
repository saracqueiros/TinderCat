import React from "react";
import { View, Text } from "react-native";
import { useCatsHooks } from "../hooks/useCatsHooks";
const Cats = () => {
  const { cats, loading, error } = useCatsHooks();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <Text>Cats</Text>
    </View>
  );
};

export default Cats;