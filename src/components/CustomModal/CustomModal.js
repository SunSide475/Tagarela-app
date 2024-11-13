import React from "react";
import Menu from "../Menu/Menu";
import { separateSyllables } from "../../utils/separateSyllables";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { Video } from "expo-av";

const CustomModal = ({ isVisible, onClose, cardInfo }) => {
  if (!isVisible) return null;

  const syllables = separateSyllables(cardInfo?.description || "");

  const videoUrl = require("../../assets/videos/cute_cats.mp4");

  const imageUrl =
    "https://em-content.zobj.net/source/apple/391/dog-face_1f436.png";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{cardInfo?.title}</Text>

          <View style={styles.videoContainer}>
            {Platform.OS === "web" ? (
              <Image source={{ uri: imageUrl }} style={styles.image} />
            ) : (
              <Video
                source={videoUrl}
                style={styles.video}
                useNativeControls={true} 
                resizeMode="contain" 
                isLooping={true} 
                shouldPlay={true} 
                onError={(e) => console.log(e)} 
              />
            )}
          </View>

          <View style={styles.syllablesContainer}>
            {syllables.map((syllable, index) => (
              <View key={index} style={styles.syllableBox}>
                <Text style={styles.syllableText}>{syllable}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>PRONTO</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Menu />
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
    borderRadius: 20,
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FF9900",
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default CustomModal;
