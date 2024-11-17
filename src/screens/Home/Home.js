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
import { BASE_IMG_URL } from "@env";
import useUserId from "../../hooks/useUserId";

const btns = [
  { id: 1, title: "ALIMENTO", category: "ALIMENTO" },
  { id: 2, title: "PESSOA", category: "PESSOA" },
  { id: 3, title: "AÇÃO", category: "ACAO"  },
  { id: 4, title: "EMOÇÃO", category: "EMOCAO" },
  { id: 5, title: "NECESSIDADE", category: "NECESSIDADE" },
  { id: 6, title: "ANIMAL", category: "ANIMAL"},
  { id: 7, title: "MATERIAL", category: "MATERIAL"},
  { id: 8, title: "OBJETO", category: "OBJETO"},
  { id: 9, title: "RESPOSTA", category: "RESPOSTA"},
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
  const { recentCards, getRecentCards, loading, getMostViewedCards, mostViewedCards, getAllCards, cards } = useCardsStore();
  const { userId } = useUserId();

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

  const openModal = (cardInfo) => {
    setSelectedCard(cardInfo);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCard(null);
  };

  if (!fontsLoaded || loading) {
    return <Loading />;
  }

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={() => setSelectedCategory(item.category)}
    >
      <Text style={styles.buttonText}>{item.title}</Text>
    </Pressable>
  );

  const filteredCards = selectedCategory
    ? cards.filter(card => card.category.toUpperCase() === selectedCategory.toUpperCase())
    : [];

  return (
    <View style={styles.container}>
      <Head />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.carouselContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={[
              styles.searchIconContainer,
              {
                marginTop: height > 800 ? height * 0.18 : height * 0.15,
              },
            ]}
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

        {selectedCategory ? (
          <>
            <Text style={styles.text}>{selectedCategory.toUpperCase()}</Text>
            <View style={styles.cardsContainer}>
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => (
                  <Card
                    key={card.id}
                    name={card.name}
                    imageUrl={BASE_IMG_URL + card.img}
                    onPress={() =>
                      openModal({
                        title: card.name,
                        description: card.syllables,
                        imageUrl: BASE_IMG_URL + card.img,
                      })
                    }
                  />
                ))
              ) : (
                <Text style={styles.text}>Não há cards para esta categoria.</Text>
              )}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.text}>RECENTES</Text>
            {recentCards.length >= 4 ? (
              <View style={styles.cardsContainer}>
                {recentCards.slice(0, 4).map((card) => (
                  <Card
                    key={card.id}
                    name={card.name}
                    imageUrl={BASE_IMG_URL + card.img}
                    onPress={() =>
                      openModal({
                        title: card.name,
                        description: card.syllables,
                        imageUrl: BASE_IMG_URL + card.img,
                      })
                    }
                  />
                ))}
              </View>
            ) : (
              <Text style={styles.text}>Não há cards suficientes para exibir.</Text>
            )}

            <Text style={styles.text}>MAIS UTILIZADOS</Text>
            {mostViewedCards.length >= 4 ? (
              <View style={styles.cardsContainer}>
                {mostViewedCards.slice(0, 4).map((card) => (
                  <Card
                    key={card.id}
                    name={card.name}
                    imageUrl={BASE_IMG_URL + card.img}
                    onPress={() =>
                      openModal({
                        title: card.name,
                        description: card.syllables,
                        imageUrl: BASE_IMG_URL + card.img,
                      })
                    }
                  />
                ))}
              </View>
            ) : (
              <Text style={styles.text}>Não há cards suficientes para exibir.</Text>
            )}
          </>
        )}
      </ScrollView>

      <Menu />

      <CustomModal
        isVisible={isModalVisible}
        onClose={closeModal}
        cardInfo={selectedCard}
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
    marginTop: 20,
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
    fontWeight: "bold",
  },
});

export default Home;
