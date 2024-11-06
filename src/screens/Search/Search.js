import React, {useState} from "react";
import {
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Loading } from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import Menu from "../../components/Menu/Menu";
import icons from "../../assets/icons/icons";
import useLoadFont from "../../hooks/useLoadFont";
import Head from "../../components/Head/Head";

const { width, height } = Dimensions.get("window");

const isTablet = width > 600;
const searchWidth = isTablet ? 60 : 40;
const searchHeight = isTablet ? 60 : 40;
const buttonWidth = isTablet ? width * 0.4 : width * 0.45;
const buttonHeight = isTablet ? 90 : 50;
const carouselPaddingLeft = isTablet ? "5%" : null;
const carouselMarginTop = isTablet ? "36%" : "46%";

const getFontSize = (size) => {
  return isTablet ? size * 1.5 : size;
};

const Search = () => {
  const [text, setText] = useState("");
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
  };

  return (
    <View style={styles.container}>
      <Head />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar..."
          value={text}
          onChangeText={handleChange}
        />
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
    backgroundColor: "#FFC247",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
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
  searchIcon: {
    marginRight: 10,
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "5%",
    paddingBottom: "38%",
    gap: 40,
  },
  text: {
    fontFamily: "regular",
    marginTop: "8%",
    paddingLeft: "10%",
  },
  input: {
    backgroundColor: "purple",
    width: "79%",
    height: 50,
    marginTop: "50%",
    borderRadius: 20,
    marginLeft: "10%"
  }
});

export default Search;
