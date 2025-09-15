import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../elements/Button";

import LikeIcon from "../assets/icons/heart.svg";
import DislikeIcon from "../assets/icons/x.svg";
import theme from "../theme/theme";

const DecisionButtons = (
    {
        onDislikePress,
        onLikePress,
    }: {
        onDislikePress: () => void;
        onLikePress: () => void;
    }
) => {
  return (
    <View style={styles.container}>
      <Button icon={<DislikeIcon />} onPress={onDislikePress} />
      <Button icon={<LikeIcon />} onPress={onLikePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    ...theme.shadow,
  },
});

export default DecisionButtons; 