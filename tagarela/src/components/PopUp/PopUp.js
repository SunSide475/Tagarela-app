import { View, StyleSheet } from "react-native";

const PopUp = (title, message) => {
  return (
    <View style={styles.popUpContainer}>
      <View style={styles.popUp}>
        <View style={styles.popUpTitle}></View>
        <View style={styles.popUpText}></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  popUpContainer: {
    backgroundColor: "#4F4F4F",
    width: "100%",
    height: "109%",
    zIndex: 1000,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popUp: {
    backgroundColor: "purple",
    width: "60%",
    height: "40%",
    display: "flex",
  },

  PopUpTitle: {
    backgroundColor: "purple",
    flex: 1,
  },
  PopUpText: {
    backgroundColor: "white",
    flex: 3,
  },
});

export default PopUp;
