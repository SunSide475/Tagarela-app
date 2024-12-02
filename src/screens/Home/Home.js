import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Loading } from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import Menu from "../../components/Menu/Menu";
import icons from "../../assets/icons/icons";
import useLoadFont from "../../hooks/useLoadFont";
import Head from "../../components/Head/Head";
import CustomModal from "../../components/CustomModal/CustomModal";
import useCardsStore from "../../store/useCardsStore";
import useUserId from "../../hooks/useUserId";

const btns = [
  { id: 10, title: "MEUS CARTÕES", category: "CUSTOM" },
  { id: 1, title: "ALIMENTO", category: "ALIMENTO" },
  { id: 2, title: "PESSOA", category: "PESSOA" },
  { id: 3, title: "AÇÃO", category: "ACAO"  },
  { id: 4, title: "EMOÇÃO", category: "EMOCAO" },
  { id: 5, title: "NECESSIDADE", category: "NECESSIDADE" },
  { id: 6, title: "ANIMAL", category: "ANIMAL" },
  { id: 7, title: "MATERIAL", category: "MATERIAL" },
  { id: 8, title: "OBJETO", category: "OBJETO" },
  { id: 9, title: "RESPOSTA", category: "RESPOSTA" },
];

const { height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const { fontsLoaded } = useLoadFont(
    {
      regular: require("../../assets/fonts/Quicksand-Regular.ttf"),
    },
    Loading
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedButtonId, setSelectedButtonId] = useState(null);
  const { recentCards, getRecentCards, loading, getMostViewedCards, mostViewedCards, getAllCards, cards } = useCardsStore();
  const { userId } = useUserId();
  const BASE_IMG_URL = "https://tagarela-sunside-pi-dsm.s3.us-east-1.amazonaws.com/";

  useEffect(() => {
    getRecentCards(userId);
    getMostViewedCards(userId);
    getAllCards();
  }, [getRecentCards, getMostViewedCards, userId, getAllCards]);

  useFocusEffect(
    React.useCallback(() => {
      getRecentCards(userId);
      getMostViewedCards(userId);
      getAllCards();
    }, [getRecentCards, getMostViewedCards, getAllCards, userId])
  );

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

  const renderItem = ({ item }) => {
    const isSelected = selectedButtonId === item.id;
    const buttonStyle = isSelected ? styles.buttonSelected : styles.button;

    return (
      <Pressable
        style={buttonStyle}
        onPress={() => {
          setSelectedCategory(item.category);
          setSelectedButtonId(item.id);
        }}
      >
        <Text style={styles.buttonText}>{item.title}</Text>
      </Pressable>
    );
  };

  const filteredCards = selectedCategory === "MEUS CARTÕES"
    ? cards.filter((card) => card.category.toUpperCase() === "CUSTOM" && card.userId === userId)
    : selectedCategory
    ? cards.filter((card) => card.category.toUpperCase() === selectedCategory.toUpperCase())
    : [];

  const renderUserCards = () => (
    <View style={styles.cardsContainer}>
      {filteredCards.length > 0 ? (
        filteredCards.map((card) => (
          <Card
            key={card.id}
            name={card.name}
            imageUrl={BASE_IMG_URL + card.img}
            onPress={() => handleCardClick(card.id)}
          />
        ))
      ) : (
        <Text style={styles.text}>Nenhum cartão cadastrado.</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Head />

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.carouselContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={[styles.searchIconContainer, { marginTop: height > 800 ? height * 0.18 : height * 0.15 }]}
          >
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

        {selectedCategory === "CUSTOM" ? (
          <>
            <Text style={styles.textCategory}>MEUS CARTÕES</Text>
            {renderUserCards()}
            <TouchableOpacity
              style={styles.createCardButton}
              onPress={() => navigation.navigate("RegisterCard")}
            >
              <Text style={styles.createCardButtonText}>Criar Cartão</Text>
            </TouchableOpacity>
          </>
        ) : selectedCategory ? (
          <>
            <Text style={styles.textCategory}>{selectedCategory.toUpperCase()}</Text>
            <ScrollView style={styles.cardsScrollView}>
              <View style={styles.cardsContainer}>
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => (
                    <Card
                      key={card.id}
                      name={card.name}
                      imageUrl={BASE_IMG_URL + card.img}
                      onPress={() => handleCardClick(card.id)}
                    />
                  ))
                ) : (
                  <Text style={styles.text}>Não há cards para esta categoria.</Text>
                )}
              </View>
            </ScrollView>
          </>
        ) : (
          <>
            <Text style={styles.textTitle}>RECENTES</Text>
            <ScrollView style={styles.cardsScrollView}>
              <View style={styles.cardsContainer}>
                {recentCards.length >= 4 ? (
                  recentCards.slice(0, 4).map((card) => (
                    <Card
                      key={card.id}
                      name={card.name}
                      imageUrl={BASE_IMG_URL + card.img}
                      onPress={() => handleCardClick(card.id)}
                    />
                  ))
                ) : (
                  <Text style={styles.text}>Não há cards suficientes para exibir.</Text>
                )}
              </View>
            </ScrollView>

            <Text style={styles.textTitle}>MAIS UTILIZADOS</Text>
            <ScrollView style={styles.cardsScrollView}>
              <View style={styles.cardsContainer}>
                {mostViewedCards.length >= 4 ? (
                  mostViewedCards.slice(0, 4).map((card) => (
                    <Card
                      key={card.id}
                      name={card.name}
                      imageUrl={BASE_IMG_URL + card.img}
                      onPress={() => handleCardClick(card.id)}
                    />
                  ))
                ) : (
                  <Text style={styles.text}>Não há cards suficientes para exibir.</Text>
                )}
              </View>
            </ScrollView>
          </>
        )}
      </ScrollView>

      <Menu />

      <CustomModal
        isVisible={isModalVisible}
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
    paddingBottom: 70
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  carouselContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginTop: 30
  },
  flatListContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 20,
  },
  button: {
    display: "flex",
    flexWrap: "nowrap",
    backgroundColor: "#FFC247",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonSelected: {
    display: "flex",
    flexWrap: "nowrap",
    backgroundColor: "#7E57C2",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "semibold",
    fontSize: 20,
  },
  searchIconContainer: {
    marginRight: 10,
    width: 32,
    height: 32,
    marginTop: height > 800 ? height * 0.18 : height * 0.15,
  },
  searchIcon: {
    width: 32,
    height: 32,
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "left",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "5%",
    paddingBottom: "5%",
    marginLeft: "5%",
    gap: 40,
  },
  cardsScrollView: {
    marginBottom: 30,
  },
  textTitle: {
    fontFamily: "regular",
    marginTop: "15%",
    paddingLeft: "8%",
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    fontFamily: "regular",
    marginTop: "2%",
    paddingLeft: "4%",
    fontSize: 21,
  },
  textCategory: {
    fontFamily: "regular",
    marginTop: "5%",
    paddingLeft: "5%",
    fontSize: 21,
  },
  createCardButton: {
    backgroundColor: "#FFC247",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignSelf: "center",
    marginTop: 20,
    marginLeft: "2%",
  },
  createCardButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
