import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import general from "../../assets/general/genereal";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../store/useAuthStore";
import { Loading } from "../../components/Loading/Loading";
import PopUp from "../../components/PopUp/PopUp";
import usePopUp from "../../hooks/usePopUp";

const Register = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, error, loading, cleanError } = useAuthStore();
  const { showPopUp, popUpVisible, popUpMessage, scale } = usePopUp();

  useEffect(() => {
    cleanError();
  }, []);

  const handleRegister = async () => {
    const { success } = await register(username, email, confirmPassword);

    if (success) {
      showPopUp("Registro realizado com sucesso!");
      navigation.navigate("Home");
    } else {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      showPopUp("Erro ao registrar.");
    }
  };

  return (
    <>
      {loading && <Loading />}
      <View style={styles.container}>
        <View style={styles.logoBg}>
          <Image
            source={general.logo.src}
            accessibilityLabel={general.logo.alt}
            style={styles.logo}
          />
        </View>
        <View style={styles.registerInputs}>
          <Text style={styles.welcome}>
            BEM-VINDO! <Text style={styles.welcomeOrange}>:)</Text>
          </Text>
          <Text style={styles.error_register}>{error}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={username}
              placeholder="APELIDO"
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              value={email}
              placeholder="EMAIL"
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              value={password}
              placeholder="SENHA"
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              placeholder="REPITA A SENHA"
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
              <Text style={styles.submitBtnTxt}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <PopUp
          title="Operação"
          message={popUpMessage}
          visible={popUpVisible}
          scale={scale}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7e57c2",
    flexDirection: "column",
  },
  error_register: {
    color: "red",
    fontSize: 15,
    marginTop: "2%",
    paddingLeft: 50,
  },
  logoBg: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  logo: {
    marginTop: 60,
    height: "40%",
    aspectRatio: 6,
    resizeMode: "contain",
  },
  registerInputs: {
    flex: 5,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 25,
    marginTop: "20%",
  },
  welcome: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#4F4F4F",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  welcomeOrange: {
    fontSize: 27,
    color: "orange",
    fontWeight: "bold",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "60%",
    gap: 20,
  },
  input: {
    width: "90%",
    height: 60,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    color: "black",
    fontSize: 18,
    paddingLeft: 20,
  },
  submitBtn: {
    backgroundColor: "#7E57C2",
    width: "80%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  submitBtnTxt: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Register;