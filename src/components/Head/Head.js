import { View, Image, StyleSheet, Dimensions } from "react-native";
import general from "../../assets/general/genereal";

const Head = () => {
  return (
    <View style={styles.headContainer}>
      <Image
        style={styles.wave}
        source={general.logoSmall.src}
        accessibilityLabel={general.logoSmall.alt}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    width: "100%",
    height: 150,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: "orange",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wave: {
    resizeMode: "contain",
    width: Dimensions.get("window").width * 0.6,
    height: "15%",
    marginTop: 40,
  },
});

export default Head;