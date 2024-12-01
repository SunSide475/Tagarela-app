import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Head from "../../components/Head/Head";
import Menu from "../../components/Menu/Menu";
import useUserId from "../../hooks/useUserId";
import useIPStore from "../../store/useIPStore"
import * as DocumentPicker from "expo-document-picker";

const { width, height } = Dimensions.get("window");

const RegisterCard = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [name, setName] = useState("");
  const [syllables, setSyllables] = useState("");
  const { userId } = useUserId();
  const { ip } = useIPStore()


  const getBlobFromUri = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error("Error converting URI to Blob:", error);
      throw error;
    }
  };

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
      if (result.type === "cancel") return; 
      console.log("Selected image:", result.uri);
      const image = {
        uri: result.assets[0].uri,
        name: result.assets[0].name,
        type: result.assets[0].mimeType,
        size: result.assets[0].size,
      };
      setImage(image);
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/*",
      });
      if (result.type === "cancel") return;
      console.log("Selected video:", result.uri);
      const video = {
        uri: result.assets[0].uri,
        name: result.assets[0].name,
        type: result.assets[0].mimeType || "video/mp4", 
        size: result.assets[0].size,
      };
      setVideo(video);
    } catch (error) {
      console.error("Error picking video:", error);
    }
  };

  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
      });
      if (result.type === "cancel") return;
      console.log("Selected audio:", result.uri);
      const audio = {
        uri: result.assets[0].uri,
        name: result.assets[0].name,
        type: result.assets[0].mimeType || "audio/mpeg", 
        size: result.assets[0].size,
      };
      setAudio(audio);
    } catch (error) {
      console.error("Error picking audio:", error);
    }
  };

  const handleSubmit = async () => {
    if (!image || !audio || !video || !name || !syllables) {
      Alert.alert("Erro", "Por favor, preencha todos os campos e envie uma imagem ou vídeo.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("syllables", syllables);
    formData.append("category", "Custom");
    formData.append("subcategory", "Custom");

    formData.append("image", {
      uri: image.uri,
      name: image.name,
      type: image.type,
    });

    formData.append("video", {
      uri: video.uri,
      name: video.name,
      type: video.type,
    });

    formData.append("audio", {
      uri: audio.uri,
      name: audio.name,
      type: audio.type,
    });

    try {
      const response = await axios.post(
        `http://${ip}:4000/user/${userId}/item`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        Alert.alert("Sucesso", "Cartão cadastrado com sucesso!");
        setImage(null);
        setVideo(null);
        setAudio(null);
        setName("");
        setSyllables("");
        navigation.navigate("Home")
      } else {
        Alert.alert("Erro", response.data.message || "Erro ao cadastrar o cartão.");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha na comunicação com a API.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Head />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>ADICIONAR CARTÃO</Text>

        <Text style={styles.text}>CARREGAR IMAGEM</Text>
        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.uploadedImage} resizeMode="cover" />
          ) : (
            <Text style={styles.uploadText}>↑</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.text}>CARREGAR VÍDEO</Text>
        <TouchableOpacity style={styles.videoButton} onPress={pickVideo}>
          {video ? (
            <Text style={styles.uploadText}>Vídeo Selecionado</Text>
          ) : (
            <Text style={styles.uploadText}>⬇ Selecionar Vídeo</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.text}>CARREGAR AÚDIO</Text>
        <TouchableOpacity style={styles.videoButton} onPress={pickAudio}>
          {audio ? (
            <Text style={styles.uploadText}>Audio Selecionado</Text>
          ) : (
            <Text style={styles.uploadText}>⬇ Selecionar Aúdio</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.text}>INFORMAÇÕES</Text>
        <TextInput
          style={styles.input}
          placeholder="NOME"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="SÍLABAS (SEPARADAS POR - )"
          value={syllables}
          onChangeText={setSyllables}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>SALVAR CARTÃO</Text>
        </TouchableOpacity>
      </ScrollView>

      <Menu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#FFC247",
    height: height * 0.12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 16,
    flexGrow: 1,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  text: {
    fontFamily: "regular",
    marginTop: "10%",
    paddingLeft: "5%",
    fontSize: 22,
    fontWeight: "bold",
  },
  imageUpload: {
    height: 150,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#7E57C2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  uploadText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  videoButton: {
    backgroundColor: "#FFC247",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#FFB300",
  },
  submitButton: {
    backgroundColor: "#7E57C2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 40,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    paddingLeft: "3%",
    borderBottomWidth: 2,
    borderColor: "#4F4F4F",
    marginTop: 20,
  },
});

export default RegisterCard;
