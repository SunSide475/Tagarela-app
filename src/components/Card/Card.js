import React from "react";
import { StyleSheet, Text, Image, Pressable } from "react-native";
import { View } from "react-native-web";

const Card = ({ name, imageUrl, smallSize }) => {
  const cardStyles = [
    styles.card,
    {
      width: smallSize ? 110 : 160,
      height: smallSize ? 110 : 170,
    },
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        ...cardStyles,
        {
          backgroundColor: pressed ? "#aaa" : "#fff",
          borderColor: "#7E57C2",
          borderWidth: pressed ? 4 : 0,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View></View>
      <Text>NÍVEL 1</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  image: {
    width: "65%",
    height: "60%",
    marginBottom: 10,
  },
  text: {
    color: "#7E57C2",
    fontWeight: "bold",
  },
});

export default Card;
