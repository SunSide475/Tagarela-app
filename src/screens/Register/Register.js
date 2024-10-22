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
      navigation.navigate("Settings");
    } else {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      showPopUp('Error');
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
              placeholder="USERNAME"
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
              <Text style={styles.submitBtnTxt}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        <PopUp
          title="Operation"
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
    justifyContent: "flex-end",
    paddingBottom: "64px",
  },
  registerInputs: {
    flex: 5,
    backgroundColor: "white",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  welcome: {
    paddingLeft: 50,
    alignContent: "flex-end",
    fontSize: 27,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "left",
    flex: 1,
  },
  welcomeOrange: {
    flex: 1,
    fontSize: 27,
    color: "orange",
    fontWeight: "bold",
  },
  inputContainer: {
    display: "flex",
    flex: 6,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    width: "75%",
    height: "12%",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    color: "black",
    fontSize: 24,
    fontWeight: "normal",
    paddingLeft: "16px",
  },
  submitBtn: {
    backgroundColor: "orange",
    width: 200,
    height: 50,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  submitBtnTxt: {
    fontSize: 20,
    color: "#000000",
  },
  popUpContainer: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -50 }],
    zIndex: 100,
  },
});

export default Register;
