import { View, Image, StyleSheet, Dimensions } from "react-native";
import general from "../../assets/general/genereal";

const { width, height } = Dimensions.get("window");

const isTablet = width > 600;
const imageWidth = isTablet ? width * 0.4 : width * 0.35;
const imageHeight = isTablet ? height * 0.029 : height * 0.02;

const Head = () => {
  return (
    <View style={styles.headContainer}>
      <Image
        style={[styles.wave, {width: imageWidth, height: imageHeight}]}
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
    marginBottom: "10%",
  },
});

export default Head;
