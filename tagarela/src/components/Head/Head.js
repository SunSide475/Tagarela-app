import { View, Image, StyleSheet } from "react-native";
import images from "../../assets/assets";

const Head = () => {
  return (
    <View style={styles.headContainer}>
      <Image
        style={styles.wave}
        source={images.head}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    width: "100%",
    height: "19%",
    position: "fixed",
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
