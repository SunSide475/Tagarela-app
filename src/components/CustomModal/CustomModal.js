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
import { BASE_IMG_URL } from "@env";
import { separateSyllables } from "../../utils/separateSyllables";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import useUserId from "../../hooks/useUserId";


const CustomModal = ({ isVisible, onClose, cardId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardInfo, setCardInfo] = useState(null);
  const { userId } = useUserId() 

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

    const player = useVideoPlayer(videoSource, (player) => {
      player.loop = false; 
      player.play();
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
              <Text style={styles.modalTitle}>{cardInfo.name}</Text>
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
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3498db",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "black",
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
    fontSize: 15,
    fontWeight: "medium",
    color: "#FFFFFF",
  },
});

export default CustomModal;
