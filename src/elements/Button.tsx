import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../theme/theme";

const Button = (
  {
    icon,
    onPress,
    disabled,
  }: {
    icon: React.ReactNode;
    onPress: () => void;
    disabled?: boolean;
  }
) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.container}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius,
    padding: 10,
  },
});

export default Button;