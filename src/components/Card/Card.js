import React from "react";
import { StyleSheet, Text, Image, Pressable } from "react-native";

const Card = ({ name, imageUrl, onPress, smallSize }) => {
  const cardStyles = [
    styles.card,
    {
      width: smallSize ? 110 : 155,
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
      onPress={onPress} 
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={[styles.text, { fontSize: smallSize ? 14 : 19 }]}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
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
