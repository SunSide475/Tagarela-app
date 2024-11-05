import Head from "../../components/Head/Head";
import {
  View,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Loading } from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import Menu from "../../components/Menu/Menu";
import icons from "../../assets/icons/icons";
import useLoadFont from "../../hooks/useLoadFont";

const btns = [
  { id: 1, title: "ALIMENTO" },
  { id: 2, title: "NECESSIDADE" },
  { id: 3, title: "NÃO SEI" },
  { id: 4, title: "ALIMENTO" },
  { id: 5, title: "NECESSIDADE" },
  { id: 6, title: "NÃO SEI" },
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
        <TouchableOpacity>
          <Image source={icons.searchPurple.src}></Image>
        </TouchableOpacity>
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
      <Text style={styles.text}>RECENTES</Text>
      <View style={styles.cardsContainer}>
        <Card
          name="CACHORRO"
          imageUrl={
            "https://em-content.zobj.net/source/apple/81/dog-face_1f436.png"
          }
        />
        <Card />
        <Card />
        <Card />
      </View>
      <Menu />
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
    marginTop: "46%",
    backgroundColor: "#fff",
    zIndex: -2,
    paddingLeft: 20,
  },
  button: {
    display: "flex",
    backgroundColor: "#FFC247",
    width: 209,
    height: 50,
    borderRadius: 60,
    marginHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "regular",
    fontSize: 28,
  },
  buttonPressed: {
    opacity: 0.2,
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "5%",
    gap: 40,
  },
  text: {
    fontSize: 22,
    fontFamily: "regular",
    marginTop: "25%",
    paddingLeft: "10%",
  },

});

export default Home;
