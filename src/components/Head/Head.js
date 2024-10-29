import { View, Image, StyleSheet } from "react-native";
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
    height: "16%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "orange",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  wave: {
    marginBottom: "10%"
  },
});

export default Head;
