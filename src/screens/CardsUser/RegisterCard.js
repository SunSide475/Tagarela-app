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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Head from "../../components/Head/Head";
import Menu from "../../components/Menu/Menu";
import useUserId from "../../hooks/useUserId";

const { width, height } = Dimensions.get("window");

const RegisterCard = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null); 
  const [video, setVideo] = useState(null); 
  const [name, setName] = useState("");
  const [syllables, setSyllables] = useState("");
  const { userId } = useUserId();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Você precisa dar permissão para acessar as fotos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3], 
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setVideo(null);
    }
  };

  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Você precisa dar permissão para acessar as fotos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, 
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      setImage(null);
    }
  };

  const handleSubmit = async () => {
    if (!image && !video || !name || !syllables) {
      Alert.alert("Erro", "Por favor, preencha todos os campos e envie uma imagem ou vídeo.");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("syllables", syllables);

    if (image) {
      const imageFile = {
        uri: image,
        type: "image/webp",
        name: `${name.replace(/\s+/g, "_")}.webp`,
      };
      formData.append("img", imageFile);
    }

    if (video) {
      const videoFile = {
        uri: video,
        type: "video/mp4",
        name: `${name.replace(/\s+/g, "_")}.mp4`,
      };
      formData.append("video", videoFile);
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/user/${userId}/item`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Sucesso", "Cartão cadastrado com sucesso!");
        setImage(null);
        setVideo(null);
        setName("");
        setSyllables("");
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

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>ADICIONAR CARTÃO</Text>

        <Text style={styles.text}>CARREGAR IMAGEM</Text>
        <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} resizeMode="cover" />
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

        <Text style={styles.text}>INFORMAÇÕES</Text>
        <TextInput
          style={styles.input}
          placeholder="NOME"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="SÍLABAS"
          value={syllables}
          onChangeText={setSyllables}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>SALVAR CARTÃO</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
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
    backgroundColor: "#FFC247", // Cor amarela
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#FFB300", // Um tom mais escuro de amarelo para o contorno
  },
  submitButton: {
    backgroundColor: "#7E57C2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegisterCard;
