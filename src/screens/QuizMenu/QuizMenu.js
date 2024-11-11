import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Loading } from "../../components/Loading/Loading";
import Menu from "../../components/Menu/Menu";
import useLoadFont from "../../hooks/useLoadFont";
import Head from "../../components/Head/Head";

const QuizMenu = () => {
  const { fontsLoaded } = useLoadFont(
    {
      regular: require("../../assets/fonts/Quicksand-Regular.ttf"),
    },
    Loading
  );

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Head />
      <Pressable
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
    paddingTop: "30%"
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
    marginTop: 50
  },
  buttonText: {
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
    fontFamily: "regular",
    color: "white",
  },
});

export default QuizMenu;
