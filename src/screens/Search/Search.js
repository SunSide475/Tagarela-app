import React, { useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Loading } from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import Menu from "../../components/Menu/Menu";
import icons from "../../assets/icons/icons";
import useLoadFont from "../../hooks/useLoadFont";
import Head from "../../components/Head/Head";

const cardsData = [
  { id: "1", name: "CACHORRO", imageUrl: "https://em-content.zobj.net/source/apple/81/dog-face_1f436.png" },
  { id: "2", name: "PANQUECA", imageUrl: "https://em-content.zobj.net/source/apple/391/pancakes_1f95e.png" },
  { id: "3", name: "SUSHI", imageUrl: "https://em-content.zobj.net/source/apple/391/sushi_1f363.png" },
  { id: "4", name: "PIZZA", imageUrl: "https://em-content.zobj.net/source/apple/391/pizza_1f355.png" },
  { id: "5", name: "SORVETE", imageUrl: "https://em-content.zobj.net/source/apple/391/soft-ice-cream_1f366.png" },
  { id: "6", name: "BOLO", imageUrl: "https://em-content.zobj.net/source/apple/391/shortcake_1f370.png" },
];

const Search = () => {
  const [text, setText] = useState("");
  const [filteredCards, setFilteredCards] = useState(cardsData);
  const { fontsLoaded } = useLoadFont(
    {
      regular: require("../../assets/fonts/Quicksand-Regular.ttf"),
    },
    Loading
  );

  if (!fontsLoaded) {
    return <Loading />;
  }

  const handleChange = (input) => {
    setText(input);

    const filtered = cardsData.filter((card) =>
      card.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCards(filtered);
  };

  return (
    <View style={styles.container}>
      <Head />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.searchContainer}>
          <Image source={icons.searchWhite.src} style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="PESQUISE O CARTÃO"
            placeholderTextColor={"#FFFFFF"}
            value={text}
            onChangeText={handleChange}
          />
        </View>

        {filteredCards.length === 0 ? (
          <Text style={styles.noResultsText}>Nenhum cartão encontrado.</Text>
        ) : (
          <View style={styles.cardsContainer}>
            {filteredCards.map((card) => (
              <Card
                key={card.id}
                smallSize={true}
                name={card.name}
                imageUrl={card.imageUrl}
              />
            ))}
          </View>
        )}
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
  searchContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7E57C2",
    width: "90%",
    height: 50,
    marginTop: "5%",
    borderRadius: 20,
    marginLeft: "5%",
    paddingHorizontal: 10,
    marginTop: "50%",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "5%",
    paddingBottom: "38%",
    gap: 20,
  },
  text: {
    fontFamily: "regular",
    marginTop: "8%",
    paddingLeft: "10%",
    color: "#FFFFFF",
  },
  input: {
    width: "100%",
    height: "100%",
    color: "#FFFFFF",
    fontSize: 18,
    borderWidth: 0,
    outlineWidth: 0,
    borderRadius: 20,
    marginLeft: "5%",
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#7E57C2",
    fontFamily: "regular",
  },
});

export default Search;