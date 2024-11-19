import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Pressable, Animated } from "react-native";
import { Audio } from "expo-av";
import Head from "../../components/Head/Head";
import Menu from "../../components/Menu/Menu";
import { useVideoPlayer, VideoView } from "expo-video";
import useGameStore from "../../store/useGameStore";
import { BASE_IMG_URL } from "@env";
import { useNavigation } from '@react-navigation/native';

const Game = () => {
  const navigation = useNavigation();
  const { level1Data, getLevelData } = useGameStore();
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const buttonScale = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const fetchData = async () => {
      await getLevelData(1);
    };
    fetchData();
  }, [getLevelData]);

  if (!level1Data || level1Data.length === 0) {
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

  // Funções para tocar os sons
  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };

  const handleCardPress = async (index) => {
    setSelectedCardIndex(index);

    if (index === correctAnswerIndex) {
      await playSound(require('../../assets/audios/correct_answer.mp3'));
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      await new Promise(resolve => setTimeout(resolve, 1000)); 

      if (currentQuestionIndex === level1Data.length - 1) {
        navigation.navigate('QuizMenu'); 
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedCardIndex(null);
      }
    } else {
      await playSound(require('../../assets/audios/wrong_answer.mp3'));
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const cardColors = ["#FFE647", "#FA0000", "#1A7BF2", "#494949"];

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
              <Animated.View
                key={item.id}
                style={{
                  transform: [{ scale: selectedCardIndex === index ? buttonScale : 1 }],
                }}
              >
                <Pressable
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
              </Animated.View>
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
