import React, { useState, useEffect } from "react";
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
import Head from "../../components/Head/Head";
import useCardsStore from "../../store/useCardsStore";
import { Loading } from "../../components/Loading/Loading";
import { BASE_IMG_URL } from "@env";

const LineCards = () => {
  const [text, setText] = useState("");
  const [queue, setQueue] = useState([]);
  const [cardNames, setCardNames] = useState([]);
  const { getAllCards, cards, error, loading } = useCardsStore();

  useEffect(() => {
    getAllCards();
  }, [getAllCards]);

  const handleAddCard = (name, img) => {
    if (!cardNames.includes(name) && queue.length < 5) { 
      setQueue([...queue, { name, img }]);
      setCardNames([...cardNames, name]);
    }
  };

  const handleClearQueue = () => {
    setQueue([]);
    setCardNames([]);
  };

  const filteredCards = cards.filter((card) =>
    card.name.toUpperCase().includes(text.toUpperCase())
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Text style={styles.errorText}>Erro: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Head />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.phraseContainer}>
          {queue.map((card, index) => {
            const imageUrl = `${BASE_IMG_URL}${card.img}`;
            const imageStyle = queue.length > 4 ? styles.cardImageInQueueSmall : styles.cardImageInQueue;

            return (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={imageStyle}
              />
            );
          })}

          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearQueue}
          >
            <Image
              source={require("../../assets/icons/icon-delete.png")}
              style={styles.deleteIcon}
            />
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
              imageUrl={BASE_IMG_URL + card.img}
              onPress={() => handleAddCard(card.name, card.img)}
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
  cardImageInQueueSmall: {
    width: 45, 
    height: 45, 
    marginRight: 15, 
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
    paddingBottom: 40,
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default LineCards;
