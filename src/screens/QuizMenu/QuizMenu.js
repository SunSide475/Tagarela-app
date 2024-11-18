import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Loading } from "../../components/Loading/Loading";
import Menu from "../../components/Menu/Menu";
import useLoadFont from "../../hooks/useLoadFont";
import Head from "../../components/Head/Head";
import useGameStore from "../../store/useGameStore";
import { useNavigation } from "@react-navigation/native";

const QuizMenu = () => {
  const { fontsLoaded } = useLoadFont(
    {
      regular: require("../../assets/fonts/Quicksand-Regular.ttf"),
      bold: require("../../assets/fonts/Quicksand-Bold.ttf"),
    },
    Loading
  );
  const navigation = useNavigation();
  const {getLevelData, level1Data} = useGameStore()

  const handleLevelPress = (level) => {
    getLevelData(level);
    navigation.navigate("Game")
  };

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Head />
      <Pressable
        onPress={() => handleLevelPress(1)}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? "#aaa" : "#7E57C2",
            borderColor: "#7E57C2",
            borderWidth: pressed ? 4 : 0,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <View style={styles.circle}>
          <Text style={styles.bigText}>1</Text>
        </View>
        <Text style={styles.buttonText}>NÍVEL 1</Text>
      </Pressable>
      <Pressable
      onPress={() => handleLevelPress(2)}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? "#aaa" : "#7E57C2",
            borderColor: "#7E57C2",
            borderWidth: pressed ? 4 : 0,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <View style={styles.circle}>
          <Text style={styles.bigText}>2</Text>
        </View>
        <Text style={styles.buttonText}>NÍVEL 2</Text>
      </Pressable>
      <Pressable
      onPress={() => handleLevelPress(3)}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? "#aaa" : "#7E57C2",
            borderColor: "#7E57C2",
            borderWidth: pressed ? 4 : 0,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <View style={styles.circle}>
          <Text style={styles.bigText}>3</Text>
        </View>
        <Text style={styles.buttonText}>NÍVEL 3</Text>
      </Pressable>
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
    justifyContent: "start",
    alignItems: "center",
    paddingTop: "30%",
  },
  button: {
    display: "flex",
    width: "88%",
    height: 80,
    backgroundColor: "purple",
    justifyContent: "start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 50,
  },
  buttonText: {
    fontFamily: "bold",
    marginLeft: 20,
    color: "#fff",
    fontSize: 19,
  },
  circle: {
    width: "22%",
    height: "100%",
    backgroundColor: "#6F45BA",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bigText: {
    fontSize: 30,
    fontFamily: "bold",
    color: "white",
  },
});

export default QuizMenu;
