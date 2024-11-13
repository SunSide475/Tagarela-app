import React from "react";
import { View, Pressable, StyleSheet, Image } from "react-native";
import icons from "../../assets/icons/icons";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const navigation = useNavigation();
  const buttonWidth = 60;
  const buttonHeight = 60;
  const menuHeight = 80;

  return (
    <View style={[styles.menuContainer, { height: menuHeight }]}>
      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={({ pressed }) => [
          styles.submitBtn,
          {
            backgroundColor: pressed ? "#6841AD" : "#7E57C2",
            width: buttonWidth,
            height: buttonHeight,
          },
        ]}
      >
        <Image
          source={icons.home.src}
          accessibilityLabel={icons.home.alt}
          style={styles.icon}
        />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Search")}
        style={({ pressed }) => [
          styles.submitBtn,
          {
            backgroundColor: pressed ? "#6841AD" : "#7E57C2",
            width: buttonWidth,
            height: buttonHeight,
          },
        ]}
      >
        <Image
          source={icons.find.src}
          accessibilityLabel={icons.find.alt}
          style={styles.icon}
        />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("QuizMenu")}
        style={({ pressed }) => [
          styles.submitBtn,
          {
            backgroundColor: pressed ? "#6841AD" : "#7E57C2",
            width: buttonWidth,
            height: buttonHeight,
          },
        ]}
      >
        <Image
          source={icons.quiz.src}
          accessibilityLabel={icons.quiz.alt}
          style={styles.icon}
        />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Settings")}
        style={({ pressed }) => [
          styles.submitBtn,
          {
            backgroundColor: pressed ? "#6841AD" : "#7E57C2",
            width: buttonWidth,
            height: buttonHeight,
          },
        ]}
      >
        <Image
          source={icons.settings.src}
          accessibilityLabel={icons.settings.alt}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: "100%",
    backgroundColor: "#7E57C2",
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    bottom: 0,
    left: 0,
    paddingHorizontal: 10,
  },
  submitBtn: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {},
});

export default Menu;
