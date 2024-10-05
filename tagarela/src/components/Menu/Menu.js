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
        <Image source={images.home}></Image>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={images.find}></Image>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={images.alarm}></Image>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={images.settings}></Image>
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
