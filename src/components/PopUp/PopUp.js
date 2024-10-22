import React from "react";
import { View, StyleSheet, Text, Animated } from "react-native";

const PopUp = ({ title, message, visible, scale }) => {
  if (!visible) return null;

  return (
    <View style={styles.popUpContainer}>
      <Animated.View style={[styles.popUp, { transform: [{ scale }] }]}>
        <View style={styles.popUpTitle}>
          <Text style={styles.popUpTextWelcome}>{title}</Text>
        </View>
        <View style={styles.popUpText}>
          <Text style={styles.popUpTextMessage}>{message}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  popUpContainer: {
    backgroundColor: "#d3d3d3",
    width: "100%",
    height: "100%",
    zIndex: 1000,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  popUp: {
    width: "80%",
    height: "auto",
    borderRadius: 10,
    overflow: "hidden",
  },
  popUpTitle: {
    backgroundColor: "#7E57C2",
    padding: 15,
    justifyContent: "center",
  },
  popUpTextWelcome: {
    fontSize: 16,
    color: "white",
  },
  popUpText: {
    backgroundColor: "white",
    padding: 20,
  },
  popUpTextMessage: {
    fontSize: 24,
    color: "#4F4F4F",
  },
});

export default PopUp;
