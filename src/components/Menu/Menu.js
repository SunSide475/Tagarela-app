import { View, Pressable, StyleSheet, Image } from "react-native";
import icons from "../../assets/icons/icons";

const Menu = () => {
  return (
    <View style={styles.menuContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={icons.home.src} accessibilityLabel={icons.home.alt}></Image>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={icons.find.src} accessibilityLabel={icons.find.alt}></Image>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={icons.alarm.src} accessibilityLabel={icons.alarm.alt}></Image>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={icons.settings.src} accessibilityLabel={icons.settings.alt}></Image>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    width: "100%",
    height: "11%",
    backgroundColor: "#7E57C2",
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    bottom: 0
  },
  submitBtn: {
    width: "20%",
    height: "85%",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Menu;
