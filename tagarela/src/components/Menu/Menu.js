import { View, Pressable, StyleSheet, Image } from "react-native";
import images from "../../assets/assets";

const Menu = () => {
  return (
    <View style={styles.menuContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={images.home.src} accessibilityLabel={images.home.alt}></Image>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={images.find.src} accessibilityLabel={images.find.alt}></Image>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={images.alarm.src} accessibilityLabel={images.alarm.alt}></Image>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={images.settings.src} accessibilityLabel={images.settings.alt}></Image>
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
