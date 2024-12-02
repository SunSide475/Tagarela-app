import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import general from "../../assets/general/genereal";
import useAuthStore from "../../store/useAuthStore";
import { Loading } from "../../components/Loading/Loading";
import PopUp from "../../components/PopUp/PopUp";
import usePopUp from "../../hooks/usePopUp";
import useLoadFont from "../../hooks/useLoadFont";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login, error, cleanError } = useAuthStore();
  const { showPopUp, popUpVisible, popUpMessage, scale } = usePopUp();

  const { fontsLoaded } = useLoadFont(
    {
      regular: require("../../assets/fonts/Quicksand-Regular.ttf"),
      bold: require("../../assets/fonts/Quicksand-Bold.ttf"),
      semiBold: require("../../assets/fonts/Quicksand-SemiBold.ttf"),
      medium: require("../../assets/fonts/Quicksand-Medium.ttf"),
    },
    Loading
  );

  useEffect(() => {
    cleanError();
  }, []);

  const handleLogin = async () => {
    const { success, user_id } = await login(email, password);

    if (success) {
      showPopUp("Login realizado com sucesso!");
      navigation.navigate("Home");
    } else {
      setEmail("");
      setPassword("");
      showPopUp("Erro ao realizar login.");
    }
  };

  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        {loading && <Loading />}
        <View style={styles.container}>
          <View style={styles.logoBg}>
            <Image
              source={general.logo.src}
              accessibilityLabel={general.logo.alt}
              style={styles.logo}
            />
            <View style={styles.loginInputs}>
              <Text style={styles.welcome}>
                BEM-VINDO <Text style={styles.welcomeOrange}>DE VOLTA</Text>
              </Text>
              <View style={styles.inputContainer}>
                {error && <Text style={styles.error}>{error}</Text>}
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
                <Pressable
                  style={({ pressed }) => [
                    styles.submitBtn,
                    { backgroundColor: pressed ? "darkviolet" : "#7E57C2" },
                  ]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text style={styles.submitBtnTxt}>
                    {loading ? "Carregando..." : "ENTRAR"}
                  </Text>
                </Pressable>
                <Text
                  style={styles.registerLink}
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.registerLinkBold}
                  onPress={() => navigation.navigate("Register")}
                  >NÃO</Text> POSSUI CONTA?
                </Text>
              </View>
            </View>
          </View>
          <PopUp
            title="Operação"
            message={popUpMessage}
            visible={popUpVisible}
            scale={scale}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logoBg: {
    height: "100%",
    width: "100%",
    backgroundColor: "orange",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginInputs: {
    height: "70%",
    width: "100%",
    backgroundColor: "white",
    marginTop: "25%",
    borderTopLeftRadius: 100,
    display: "flex",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: 170,
    width: "70%",
    height: undefined,
    aspectRatio: 6,
    resizeMode: "contain",
  },
  welcome: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#4F4F4F",
  },
  welcomeOrange: {
    fontSize: 27,
    color: "#FF9900",
    fontWeight: "bold",
  },
  inputContainer: {
    height: "60%",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    justifyContent: "space-around",
    gap: 20,
  },
  input: {
    width: "88%",
    height: 60,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    color: "black",
    fontFamily: "regular",
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  submitBtn: {
    backgroundColor: "#7E57C2",
    width: "60%",
    height: 50,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  submitBtnTxt: {
    color: "white",
    fontFamily: "bold",
    fontSize: 23,
  },
  registerLink: {
    color: "#4F4F4F",
    fontSize: 20,
    fontFamily: "medium"
  },
  registerLinkBold: {
    color: "#4F4F4F",
    fontFamily: "semiBold",
    fontSize: 20,
  },
  error: {
    color: "red",
  },
});

export default Login;
