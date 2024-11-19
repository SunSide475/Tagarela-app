import React, { useEffect, useState } from "react";
import { Animated, Pressable, Image, Text, StyleSheet, View } from "react-native";
import { Audio } from "expo-av";
import { BASE_IMG_URL } from "@env";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Loading } from "../../components/Loading/Loading";
import { useVideoPlayer, VideoView } from "expo-video";
import Head from "../../components/Head/Head";
import Menu from "../../components/Menu/Menu";
import useGameStore from "../../store/useGameStore";

const Game = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params;
  const { levelData, getLevelData, loading } = useGameStore();
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const buttonScale = useState(new Animated.Value(1))[0];


  const videoSource = levelData?.[currentQuestionIndex]?.game_items[
    levelData?.[currentQuestionIndex]?.correct_answer
  ]
    ? { uri: BASE_IMG_URL + levelData[currentQuestionIndex].game_items[levelData[currentQuestionIndex].correct_answer].video }
    : require("../../assets/videos/cute_cats.mp4");

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };

  useEffect(() => {
    const fetchData = async () => {
      await getLevelData(level);
    };
    fetchData();
  }, [level, getLevelData]);

  if (loading || !levelData || levelData.length === 0) {
    return <Loading />;
  }

  const currentQuestion = levelData[currentQuestionIndex];
  const correctAnswerIndex = currentQuestion.correct_answer;

  const triggerAnimation = () => {
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
  };

  const handleCardPress = async (index) => {
    setSelectedCardIndex(index);
    triggerAnimation();

    if (index === correctAnswerIndex) {
      await playSound(require('../../assets/audios/correct_answer.mp3'));

      await new Promise(resolve => setTimeout(resolve, 1000));

      if (currentQuestionIndex === levelData.length - 1) {
        navigation.navigate('QuizMenu');
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedCardIndex(null);
      }
    } else {
      await playSound(require('../../assets/audios/wrong_answer.mp3'));
    }
  };

  const cardColors = ["#FFE647", "#FA0000", "#1A7BF2", "#494949"];

  return (
    <>
      <Head />
      <View style={styles.gameContainer}>
        <View style={styles.settingsTitle}>
          <Text style={styles.title}>
            NÍVEL {level} - QUESTÃO {currentQuestionIndex + 1}/{levelData.length}
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
                        : cardColors[index % cardColors.length],
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
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 200,
  },
  settingsTitle: {
    marginBottom: 25,
    width: "87%",
    display: "flex",
    justifyContent: "center",
    borderBottomColor: "#7E57C2",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 23,
    fontWeight: "600",
    color: "#4F4F4F",
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