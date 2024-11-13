import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Image } from "react-native";
import icons from "../../assets/icons/icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const Menu = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  const isFocused = useIsFocused();

  const buttonWidth = 60;
  const buttonHeight = 60;
  const menuHeight = 80;

  const handlePress = (screen) => {
    setSelected(screen);
    navigation.navigate(screen);
  };

  useEffect(() => {
    if (isFocused) {
      const currentScreen = navigation.getState().routes[navigation.getState().index].name;
      setSelected(currentScreen);
    }
  }, [isFocused, navigation]);

  return (
    <View style={[styles.menuContainer, { height: menuHeight }]}>
      {[
        { screen: "Home", icon: icons.home.src, alt: icons.home.alt },
        { screen: "LineCards", icon: icons.fila.src, alt: icons.fila.alt },
        { screen: "QuizMenu", icon: icons.quiz.src, alt: icons.quiz.alt },
        { screen: "Settings", icon: icons.settings.src, alt: icons.settings.alt },
      ].map((item) => (
        <Pressable
          key={item.screen}
          onPress={() => handlePress(item.screen)}
          style={({ pressed }) => [
            styles.submitBtn,
            {
              backgroundColor: pressed ? "#6841AD" : "#7E57C2",
              width: buttonWidth,
              height: buttonHeight,
            },
          ]}
        >
          {selected === item.screen && (
            <View style={styles.selectedCircle} />
          )}
          <Image
            source={item.icon}
            accessibilityLabel={item.alt}
            style={styles.icon}
          />
        </Pressable>
      ))}
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
    position: "relative",
  },
  selectedCircle: {
    position: "absolute",
    backgroundColor: "#6841AD",
    width: 70,
    height: 70,
    borderRadius: 25,
    zIndex: -1,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default Menu;