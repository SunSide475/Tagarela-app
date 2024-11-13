import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import Card from "../../components/Card/Card";
import Menu from "../../components/Menu/Menu";
import icons from "../../assets/icons/icons";
import useLoadFont from "../../hooks/useLoadFont";
import Head from "../../components/Head/Head";

const LineCards = () => {
  const [text, setText] = useState("");
  const [queue, setQueue] = useState([]);
  const [cardNames, setCardNames] = useState([]);

  const handleAddCard = (name, imageUrl) => {
    if (!cardNames.includes(name) && queue.length < 3) {
      setQueue([...queue, { name, imageUrl }]);
      setCardNames([...cardNames, name]);
    }
  };

  const handleClearQueue = () => {
    setQueue([]);
    setCardNames([]);
  };

  const filteredCards = [
    { name: "CACHORRO", imageUrl: "https://em-content.zobj.net/source/apple/81/dog-face_1f436.png" },
    { name: "PANQUECA", imageUrl: "https://em-content.zobj.net/source/apple/391/pancakes_1f95e.png" },
    { name: "SUSHI", imageUrl: "https://em-content.zobj.net/source/apple/391/sushi_1f363.png" },
    { name: "PIZZA", imageUrl: "https://em-content.zobj.net/source/apple/391/pizza_1f355.png" },
    { name: "SORVETE", imageUrl: "https://em-content.zobj.net/source/apple/391/soft-ice-cream_1f366.png" },
    { name: "BOLO", imageUrl: "https://em-content.zobj.net/source/apple/391/shortcake_1f370.png" },
  ].filter(card => card.name.toLowerCase().includes(text.toLowerCase()));

  return (
    <View style={styles.container}>
      <Head />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        
        <View style={styles.phraseContainer}>
          {queue.map((card, index) => (
            <Image
              key={index}
              source={{ uri: card.imageUrl }}
              style={styles.cardImageInQueue}
            />
          ))}
          
          <TouchableOpacity style={styles.clearButton} onPress={handleClearQueue}>
            <Image source={require("../../assets/icons/icon-delete.png")} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Image source={icons.searchWhite.src} style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="PESQUISE O CARTÃO"
            placeholderTextColor={"#FFFFFF"}
            value={text}
            onChangeText={setText}
          />
        </View>

        <View style={styles.cardsContainer}>
          {filteredCards.map((card) => (
            <Card
              key={card.name}
              smallSize={true}
              name={card.name}
              imageUrl={card.imageUrl}
              onPress={() => handleAddCard(card.name, card.imageUrl)}
            />
          ))}
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
    paddingTop: 50,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  phraseContainer: {
    width: "90%",
    height: 120,
    borderColor: "#7E57C2",
    borderWidth: 2,
    marginTop: 150,
    marginLeft: "5%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingHorizontal: 10,
  },
  cardImageInQueue: {
    width: 60,
    height: 60,
    marginRight: 20,
    marginBottom: 10,
  },
  searchContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7E57C2",
    width: "90%",
    height: 50,
    marginTop: 50,
    borderRadius: 20,
    marginLeft: "5%",
    paddingHorizontal: 10,
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "5%",
    gap: 20,
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
  deleteIcon: {
    width: 30,
    height: 30,
  },
  clearButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 5,
  },
});


export default LineCards;