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
import { launchImageLibrary } from "react-native-image-picker";
import Head from "../../components/Head/Head";
import Menu from "../../components/Menu/Menu";

const { width, height } = Dimensions.get("window");

const RegisterCard = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [name, setName] = useState("");
  const [syllables, setSyllables] = useState("");

  const handleImageUpload = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          Alert.alert("Cancelado", "Seleção de imagem foi cancelada.");
        } else if (response.errorMessage) {
          Alert.alert("Erro", response.errorMessage);
        } else {
          const selectedImage = response.assets[0];
          setImage(selectedImage.uri);
        }
      }
    );
  };

  const handleVideoUpload = () => {
    launchImageLibrary(
      {
        mediaType: "video",
      },
      (response) => {
        if (response.didCancel) {
          Alert.alert("Cancelado", "Seleção de vídeo foi cancelada.");
        } else if (response.errorMessage) {
          Alert.alert("Erro", response.errorMessage);
        } else {
          const selectedVideo = response.assets[0];
          setVideo(selectedVideo.uri);
        }
      }
    );
  };

  const handleSubmit = () => {
    if (!image || !name || !syllables) {
      Alert.alert("Erro", "Por favor, preencha todos os campos e envie uma imagem.");
      return;
    }

    const cardData = {
      image,
      video,
      name,
      syllables,
    };

    console.log("Dados enviados:", cardData);

    Alert.alert("Sucesso", "Cartão cadastrado com sucesso!");
    setImage(null);
    setVideo(null);
    setName("");
    setSyllables("");
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
        <TouchableOpacity style={styles.imageUpload} onPress={handleImageUpload}>
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} resizeMode="cover" />
          ) : (
            <Text style={styles.uploadText}>↑</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadButton} onPress={handleSubmit}>
          <Text style={styles.uploadButtonText}>ENVIAR IMAGEM</Text>
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

        <TouchableOpacity style={styles.videoButton} onPress={handleVideoUpload}>
          <Text style={styles.videoButtonText}>⬇ CARREGAR VÍDEO</Text>
        </TouchableOpacity>
        {video && <Text style={styles.videoInfo}>Vídeo selecionado: {video.split('/').pop()}</Text>}

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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flex: 1,
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
    paddingLeft: "5%%",
    fontSize: 22,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
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
    fontSize: 32,
    color: "#7E57C2",
  },
  uploadButton: {
    backgroundColor: "#FFC247",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    marginVertical: 12,
    fontSize: 16,
  },
  videoButton: {
    backgroundColor: "#FFC247",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  videoButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  videoInfo: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: "#7E57C2",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RegisterCard;
