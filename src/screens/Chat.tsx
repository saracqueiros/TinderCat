import React from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../theme/theme";

const Chat = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>02</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 80,
    fontWeight: 'bold',
    color: theme.colors.grey,
  },
});


export default Chat;