import React from "react";
import { View, Pressable, StyleSheet, Image, Dimensions } from "react-native";
import icons from "../../assets/icons/icons";

const { width, height } = Dimensions.get("window");

const isTablet = width > 600;
const buttonWidth = isTablet ? width * 0.18 : width * 0.22;
const buttonHeight = isTablet ? height * 0.11 : height * 0.1;
const menuHeight = isTablet ? height * 0.12 : height * 0.11;

const Menu = () => {
  return (
    <View style={[styles.menuContainer, { height: menuHeight }]}>
      <Pressable
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
          source={icons.alarm.src}
          accessibilityLabel={icons.alarm.alt}
          style={styles.icon}
        />
      </Pressable>

      <Pressable
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
  icon: {
    width: "38%",
    height: "38%", 
  },
});

export default Menu;
