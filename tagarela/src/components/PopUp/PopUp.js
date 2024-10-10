import { View, StyleSheet, Text} from "react-native";

const PopUp = ({title, message}) => {
  return (
    <View style={styles.popUpContainer}>
      <View style={styles.popUp}>
        <View style={styles.PopUpTitle}>
          <Text style={styles.PopUpTextWelcome}>{title}</Text>
        </View>
        <View style={styles.PopUpText}>
          <Text style={styles.PopUpTextRegister}>{message}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  popUpContainer: {
    backgroundColor: "#d3d3d3",
    width: "100%",
    height: "109%",
    zIndex: 1000,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  popUp: {
    width: "80%",
    height: "25%",
  },
  PopUpTitle: {
    backgroundColor: "#7E57C2",
    width: "100%",
    height: "23%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    paddingLeft: 30,
  },
  PopUpTextWelcome: {
    fontSize: 16,
    color: "white",
  },
  PopUpTextRegister: {
    fontSize: 24,
    color: "#4F4F4F",
  },
  PopUpText: {
    backgroundColor: "white",
    width: "100%",
    height: "70%",
    padding: 30,
    paddingTop: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PopUp;
