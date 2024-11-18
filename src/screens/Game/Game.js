import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Pressable, Alert } from "react-native";
import Head from "../../components/Head/Head";
import Menu from "../../components/Menu/Menu";
import { useVideoPlayer, VideoView } from "expo-video";
import useGameStore from "../../store/useGameStore";
import { BASE_IMG_URL } from "@env";

const Game = () => {
  const { level1Data, getLevelData } = useGameStore();
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await getLevelData(1);
    };
    fetchData();
  }, [getLevelData]);

  useEffect(() => {
    
  }, [level1Data]);

  if (!level1Data) {
    return <Text>Carregando dados ou nenhum dado disponível...</Text>;
  }

  const currentQuestion = level1Data[currentQuestionIndex]; 

  if (!currentQuestion) {
    return <Text>Não há perguntas disponíveis.</Text>;
  }

  const correctAnswerIndex = currentQuestion.correct_answer; 

  const videoSource = currentQuestion.game_items[correctAnswerIndex]
    ? { uri: BASE_IMG_URL + currentQuestion.game_items[correctAnswerIndex].video }
    : require("../../assets/videos/cute_cats.mp4");

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  const handleCardPress = (index) => {
    setSelectedCardIndex(index);

    if (index === correctAnswerIndex) {
      if (currentQuestionIndex === level1Data.length - 1) {
        Alert.alert("Quiz Finalizado", "Parabéns! Você completou o quiz.");
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedCardIndex(null);
      }
    } else {
      Alert.alert("Resposta Incorreta", "Tente novamente!");
    }
  };

  const cardColors = ["#FFB6C1", "#ADD8E6", "#90EE90", "#FFD700"];

  return (
    <>
      <Head />
      <View style={styles.gameContainer}>
        <View style={styles.settingsTitle}>
          <Text style={styles.title}>
            NÍVEL 1 - QUESTÃO {currentQuestionIndex + 1}/{level1Data.length}
          </Text>
        </View>
        <View style={styles.videoContainer}>
          <VideoView style={styles.video} player={player} />
        </View>
        <View style={styles.cardsContainer}>
          {currentQuestion.game_items && currentQuestion.game_items.length > 0 ? (
            currentQuestion.game_items.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => handleCardPress(index)}
                style={[
                  styles.cardStyle,
                  {
                    backgroundColor: selectedCardIndex === index
                      ? (index === correctAnswerIndex ? "green" : "red")
                      : cardColors[index % cardColors.length]
                  },
                ]}
              >
                <Image source={{ uri: BASE_IMG_URL + item.img }} style={styles.image} />
              </Pressable>
            ))
          ) : (
            <Text style={styles.noItemsText}>Nenhum item disponível.</Text>
          )}
        </View>
      </View>
      <Menu />
    </>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    zIndex: -2,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 200,
  },
  title: {
    fontSize: 23,
    fontWeight: "600",
    color: "#4F4F4F",
  },
  text: {
    fontSize: 18,
    fontWeight: "100",
    color: "#4F4F4F",
  },
  settingsTitle: {
    marginBottom: 25,
    width: "87%",
    height: "7%",
    display: "flex",
    justifyContent: "center",
    borderBottomColor: "#7E57C2",
    borderBottomWidth: 1,
  },
  settingsActions: {
    marginTop: 20,
    width: "80%",
    height: "7%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionsTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    width: 32,
    height: 32,
  },
  iconArrow: {
    width: 25,
    height: 25,
  },
  videoContainer: {
    width: "100%",
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  video: {
    width: "88%",
    height: "100%",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "87%",
    height: 300,
  },
  cardStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  image: {
    width: "40%",
    height: "60%",
    marginBottom: 10,
  },
});

export default Game;
