import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Image
} from "react-native";
import axios from "axios";
import { separateSyllables } from "../../utils/separateSyllables";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import useUserId from "../../hooks/useUserId";
import icons from "../../assets/icons/icons";
import { Audio } from "expo-av";

const CustomModal = ({ isVisible, onClose, cardId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardInfo, setCardInfo] = useState(null);
  const { userId } = useUserId();
  const [sound, setSound] = useState(null); 
  const BASE_IMG_URL = "https://tagarela-sunside-pi-dsm.s3.us-east-1.amazonaws.com/";

  useEffect(() => {
    if (cardId) {
      const fetchCardInfo = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `http://10.0.2.2:4000/item/${cardId}/user/${userId}`
          );
          setCardInfo(response.data.item);
          setLoading(false);
        } catch (error) {
          setError("Erro ao carregar os detalhes do cartão.");
          setLoading(false);
        }
      };
      fetchCardInfo();
    }
  }, [cardId]);

  const syllables = cardInfo ? separateSyllables(cardInfo.syllables || "") : [];
  const videoSource = cardInfo ? BASE_IMG_URL + cardInfo?.video : null;
  const audioSource = cardInfo ? BASE_IMG_URL + cardInfo?.audio : null; 

  const playAudio = async () => {
    if (sound) {
      await sound.unloadAsync(); 
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: audioSource }
    );
    setSound(newSound); 
    await newSound.playAsync(); 
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
    player.isControlsVisible = false;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  if (!isVisible || !cardId) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {loading ? (
            <ActivityIndicator size="large" color="#3498db" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              <Text style={styles.modalTitle}>{cardInfo.name.toUpperCase()}</Text>
              <View style={styles.videoContainer}>
                {Platform.OS === "web" ? (
                  <Image
                    source={{ uri: BASE_IMG_URL + cardInfo?.img }}
                    style={styles.image}
                  />
                ) : (
                  <VideoView
                    style={styles.video}
                    player={player}
                  />
                )}
              </View>
              <View style={styles.syllablesContainer}>
                {syllables.map((syllable, index) => (
                  <View key={index} style={styles.syllableBox}>
                    <Text style={styles.syllableText}>
                      {syllable.toUpperCase()}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}
          <View style={styles.view}>
            <TouchableOpacity onPress={playAudio}>
              <Image
                source={icons.play.src}
                accessibilityLabel={icons.play.alt}
                style={styles.playImage}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>PRONTO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  view: {
    backgroundColor: "#7E57C2",
    width: 60,
    height: 65,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  playImage: {
    width: 25,
    height: 25,
  },
  modalContent: {
    width: "100%",
    height: "75%",
    position: "absolute",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    bottom: 0,
  },
  modalTitle: {
    color: "#4F4F4F",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  videoContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "gray",
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  closeButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#FF9900",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  syllablesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },
  syllableBox: {
    width: 50,
    height: 50,
    backgroundColor: "#FF9900",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 5,
  },
  syllableText: {
    fontSize: 18,
    fontWeight: "medium",
    color: "#FFFFFF",
  },
});

export default CustomModal;