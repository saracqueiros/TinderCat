import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { Cat } from "../api/types";
import theme from "../theme/theme";

const CatCard = ({ cat }: { cat: Cat }) => {

  return (
    <View style={styles.container}>
      <ImageBackground
      source={{ uri: cat.image?.url }} style={styles.image}
      resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.nameContainer}>
            <Text style={styles.text}>{cat.name}</Text>
            <Text style={styles.text}>{cat.adaptability}</Text>
        </View>
        <Text style={styles.secondaryText}>{cat.origin}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadiusSmall,
    overflow: 'hidden',
    height: '45%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    marginHorizontal: 20,
    borderTopLeftRadius: theme.borderRadiusSmall,
    borderTopRightRadius: theme.borderRadiusSmall,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
  },
  text: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
  },
  secondaryText: {
    fontSize: 8,
    color: theme.colors.shadow,
    fontFamily: theme.fonts.regular,
  },
});

export default CatCard;