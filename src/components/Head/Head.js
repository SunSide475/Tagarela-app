import { View, Image, StyleSheet } from "react-native";
import general from "../../assets/general/genereal";

const Head = () => {
  return (
    <View style={styles.headContainer}>
      <Image
        style={styles.wave}
        source={general.head.src}
        accessibilityLabel={general.head.alt}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    width: "100%",
    height: "19%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  wave: {
    height: "100%",
  },
});

export default Head;
