import { View, Pressable, StyleSheet, Image } from "react-native";

const Menu = () => {
  return (
    <View style={styles.menuContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={require("../../assets/icon-home.png")}></Image>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={require("../../assets/icon-find.png")}></Image>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={require("../../assets/icon-alarm.png")}></Image>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.submitBtn,
          { backgroundColor: pressed ? "#6841AD" : "#7E57C2" },
        ]}
      >
        <Image source={require("../../assets/icon-settings.png")}></Image>
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
