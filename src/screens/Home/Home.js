import React from "react";
import {
  View,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Loading } from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import Menu from "../../components/Menu/Menu";
import icons from "../../assets/icons/icons";
import useLoadFont from "../../hooks/useLoadFont";
import Head from "../../components/Head/Head";

const btns = [
  { id: 1, title: "ALIMENTO" },
  { id: 2, title: "NECESSIDADE" },
  { id: 3, title: "VIDA" },
  { id: 4, title: "ALIMENTO" },
  { id: 5, title: "NECESSIDADE" },
  { id: 6, title: "CORES" },
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
      style={({ pressed }) => [
        styles.button,
        { width: 50, height: 10 },
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.buttonText}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Head />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.carouselContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Image source={icons.searchPurple.src} style={styles.searchIcon} />
          </TouchableOpacity>

          <FlatList
            data={btns}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>

        <Text style={styles.text}>RECENTES</Text>

        <View style={styles.cardsContainer}>
          <Card
            name="CACHORRO"
            imageUrl={
              "https://em-content.zobj.net/source/apple/81/dog-face_1f436.png"
            }
          />
          <Card
            name="PANQUECA"
            imageUrl={
              "https://em-content.zobj.net/source/apple/391/pancakes_1f95e.png"
            }
          />
          <Card
            name="SUSHI"
            imageUrl={
              "https://em-content.zobj.net/source/apple/391/sushi_1f363.png"
            }
          />
          <Card
            name="PIZZA"
            imageUrl={
              "https://em-content.zobj.net/source/apple/391/pizza_1f355.png"
            }
          />
        </View>
        <Text style={styles.text}>MAIS UTILIZADOS</Text>

        <View style={[styles.cardsContainer, {paddingBottom: "35%"}]}>     
          <Card
            name="SORVETE"
            imageUrl={
              "https://em-content.zobj.net/source/apple/391/soft-ice-cream_1f366.png"
            }
          />
          <Card
            name="BOLO"
            imageUrl={
              "https://em-content.zobj.net/source/apple/391/shortcake_1f370.png"
            }
          />
          <Card
            name="SUSHI"
            imageUrl={
              "https://em-content.zobj.net/source/apple/391/sushi_1f363.png"
            }
          />
          <Card
            name="PIZZA"
            imageUrl={
              "https://em-content.zobj.net/source/apple/391/pizza_1f355.png"
            }
          />
        </View>
      </ScrollView>

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
  scrollViewContainer: {
    flexGrow: 1,
  },
  carouselContainer: {
    marginTop: "46%",
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  flatListContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  button: {
    display: "flex",
    flexWrap: "nowrap",
    backgroundColor: "#FFC247",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    paddingHorizontal: 110,
    paddingVertical: 26,
    marginTop: 25,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "regular",
    fontSize: 24,
  },
  buttonPressed: {
    opacity: 0.2,
  },
  searchIcon: {
    marginRight: 10,
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "5%",
    paddingBottom: "5%",
    gap: 40,
  },
  text: {
    fontFamily: "regular",
    marginTop: "8%",
    paddingLeft: "7%",
    fontSize: 22,
  },
});

export default Home;
