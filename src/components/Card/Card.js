import React from "react";
import { StyleSheet, Text, Image, Pressable } from "react-native";

const Card = ({ name, imageUrl }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: pressed ? "#aaa" : "#fff",
          borderColor: "#7E57C2",
          borderWidth: pressed ? 4 : 0,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Image source={{ uri: `${imageUrl}` }} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
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
    width: 160,
    height: 170
  },
  image: {
    width: "65%",
    height: "60%",
    marginBottom: 10,
  },
  text: {
    fontSize: 19,
    color: "#7E57C2",
    fontWeight: "bold",
  },
});

export default Card;
