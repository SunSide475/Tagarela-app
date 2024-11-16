import React, { useState } from "react";
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

const btns = [
  { id: 1, title: "ALIMENTO" },
  { id: 2, title: "AÇÃO" },
  { id: 3, title: "EMOÇÃO" },
  { id: 4, title: "NECESSIDADE" },
  { id: 5, title: "PESSOA" },
  { id: 6, title: "MEUS CARTÕES" },
];

const { height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const { fontsLoaded } = useLoadFont(
    {
      regular: require("../../assets/fonts/Quicksand-Regular.ttf"),
    },
    Loading
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const openModal = (cardInfo) => {
    setSelectedCard(cardInfo);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCard(null);
  };

  if (!fontsLoaded) {
    return <Loading />;
  }

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}>
      <Text style={styles.buttonText}>{item.title}</Text>
    </Pressable>
  );

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

        <Text style={styles.text}>RECENTES</Text>
        <View style={styles.cardsContainer}>
          <Card
            name="CACHORRO"
            imageUrl="https://em-content.zobj.net/source/apple/81/dog-face_1f436.png"
            onPress={() =>
              openModal({
                title: "CACHORRO",
                description: "CA-CHO-RRO",
                imageUrl: "https://em-content.zobj.net/source/apple/81/dog-face_1f436.png",
              })
            }
          />
          <Card
            name="PANQUECA"
            imageUrl="https://em-content.zobj.net/source/apple/391/pancakes_1f95e.png"
            onPress={() =>
              openModal({
                title: "PANQUECA",
                description: "PAN-QUE-CA",
                imageUrl: "https://em-content.zobj.net/source/apple/391/pancakes_1f95e.png",
              })
            }
          />
          <Card
            name="SUSHI"
            imageUrl="https://em-content.zobj.net/source/apple/391/sushi_1f363.png"
            onPress={() =>
              openModal({
                title: "SUSHI",
                description: "SU-SHI",
                imageUrl: "https://em-content.zobj.net/source/apple/391/sushi_1f363.png",
              })
            }
          />
          <Card
            name="PIZZA"
            imageUrl="https://em-content.zobj.net/source/apple/391/pizza_1f355.png"
            onPress={() =>
              openModal({
                title: "PIZZA",
                description: "PI-ZZA",
                imageUrl: "https://em-content.zobj.net/source/apple/391/pizza_1f355.png",
              })
            }
          />
        </View>
        <Text style={styles.text}>MAIS UTILIZADOS</Text>

        <View style={[styles.cardsContainer, { paddingBottom: "35%" }]}>
          <Card
            name="SORVETE"
            imageUrl="https://em-content.zobj.net/source/apple/391/soft-ice-cream_1f366.png"
            onPress={() =>
              openModal({
                title: "SORVETE",
                description: "SOR-VE-TE",
                imageUrl: "https://em-content.zobj.net/source/apple/391/soft-ice-cream_1f366.png",
              })
            }
          />
          <Card
            name="BOLO"
            imageUrl="https://em-content.zobj.net/source/apple/391/shortcake_1f370.png"
            onPress={() =>
              openModal({
                title: "BOLO",
                description: "BO-LO",
                imageUrl: "https://em-content.zobj.net/source/apple/391/shortcake_1f370.png",
              })
            }
          />
          <Card
            name="SUSHI"
            imageUrl="https://em-content.zobj.net/source/apple/391/sushi_1f363.png"
            onPress={() =>
              openModal({
                title: "SUSHI",
                description: "SU-SHI",
                imageUrl: "https://em-content.zobj.net/source/apple/391/sushi_1f363.png",
              })
            }
          />
          <Card
            name="PIZZA"
            imageUrl="https://em-content.zobj.net/source/apple/391/pizza_1f355.png"
            onPress={() =>
              openModal({
                title: "PIZZA",
                description: "PI-ZZA",
                imageUrl: "https://em-content.zobj.net/source/apple/391/pizza_1f355.png",
              })
            }
          />
        </View>
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
