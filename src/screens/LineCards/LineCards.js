import React, { useState } from "react";
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

const LineCards = () => {
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
        <View style={styles.cardsContainer}>
          <Card
            smallSize={true}
            name="CACHORRO"
            imageUrl={
              "https://em-content.zobj.net/source/apple/81/dog-face_1f436.png"
            }
          />
          <Card
            smallSize={true}
            name="PANQUECA"
            imageUrl={
              "https://em-content.zobj.net/source/apple/391/pancakes_1f95e.png"
            }
          />
          <Card
            smallSize={true}
            name="SUSHI"
            imageUrl={
              "https://em-content.zobj.net/source/apple/391/sushi_1f363.png"
            }
          />
          <Card
            smallSize={true}
            name="PIZZA"
            imageUrl={
              "https://em-content.zobj.net/source/apple/391/pizza_1f355.png"
            }
          />
          <Card
            smallSize={true}
            name="SORVETE"
            imageUrl={
              "https://em-content.zobj.net/source/apple/391/soft-ice-cream_1f366.png"
            }
          />
          <Card
            smallSize={true}
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
});

export default LineCards;
