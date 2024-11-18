import React, { useState, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Loading } from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import Menu from "../../components/Menu/Menu";
import icons from "../../assets/icons/icons";
import useLoadFont from "../../hooks/useLoadFont";
import Head from "../../components/Head/Head";
import useCardsStore from "../../store/useCardsStore";
import CustomModal from "../../components/CustomModal/CustomModal";
import { BASE_IMG_URL } from '@env';

const Search = () => {
  const [text, setText] = useState(""); 
  const [filteredCards, setFilteredCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);  
  const [selectedCard, setSelectedCard] = useState(null);   
  const { getAllCards, cards, error, loading } = useCardsStore();

  const { fontsLoaded } = useLoadFont(
    {
      regular: require("../../assets/fonts/Quicksand-Regular.ttf"),
    },
    Loading
  );

  useEffect(() => {
    if (cards.length === 0) {
      getAllCards();
    } else {
      setFilteredCards(cards);
    }
  }, [getAllCards, cards]);

  const handleChange = (input) => {
    setText(input);

    if (input === "") {
      setFilteredCards(cards);
    } else {
      const filtered = cards.filter((card) =>
        card.name.toUpperCase().includes(input.toUpperCase())
      );
      setFilteredCards(filtered);
    }
  };

  const handleCardClick = (id) => {
    setSelectedCard(id);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCard(null);
  };

  if (!fontsLoaded || loading) {
    return <Loading />;
  }

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

        {error && <Text style={styles.noResultsText}>{error}</Text>}

        {filteredCards.length === 0 ? (
          <Text style={styles.noResultsText}>Nenhum cartão encontrado.</Text>
        ) : (
          <View style={styles.cardsContainer}>
            {filteredCards.map((card) => (
              <Card
                key={card.id}
                smallSize={true}
                name={card.name}
                imageUrl={BASE_IMG_URL + card.img}
                onPress={() => handleCardClick(card.id)}  
              />
            ))}
          </View>
        )}
      </ScrollView>

      <Menu />

      <CustomModal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        cardId={selectedCard}  
      />
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
