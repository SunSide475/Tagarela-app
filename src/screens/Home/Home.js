import Head from "../../components/Head/Head";
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";
import { Loading } from "../../components/Loading/Loading";
import useLoadFont from "../../hooks/useLoadFont";

const btns = [
  { id: 1, title: "alimento" },
  { id: 2, title: "necessidade" },
  { id: 3, title: "não sei" },
  { id: 4, title: "alimento" },
  { id: 5, title: "necessidade" },
  { id: 6, title: "não sei" },
];

const Home = () => {
  const { fontsLoaded } = useLoadFont(
    {
      regular: require("../../assets/fonts/Quicksand-Regular.ttf"),
    },
    Loading
  );

  if (!fontsLoaded) {
    return <Loading />;
  }

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.buttonText}>{item.title}</Text>
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <Head />
      <View style={styles.carouselContainer}>
        <View styles={styles.carousel}>
          <FlatList
            data={btns}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            styles={styles.flat}
          ></FlatList>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  carousel: {
    height: "auto",
  },
  flat: {
    width: "100%",
  },
  carouselContainer: {
    height: 60,
    width: "100%",
    marginTop: "40%",
    backgroundColor: "#fff",
    zIndex: -2,
  },
  button: {
    display: "flex",
    backgroundColor: "#FFC247",
    width: 279,
    height: 58,
    borderRadius: 60,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "regular",
    fontSize: 32,
  },
  buttonPressed: {
    opacity: 0.2,
  },
});

export default Home;
