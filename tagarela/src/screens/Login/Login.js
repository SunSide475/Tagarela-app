import { useState } from "react";
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

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useAuthStore();

  const handleLogin = async () => {
    const response = await login(email, password);

    if (response) {
      const currentError = useAuthStore.getState().error;
      if (!currentError) {
        navigation.navigate("Settings");
      } else {
        setEmail('')
        setPassword('')
      }
    }
  };
  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
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
                    { backgroundColor: pressed ? "darkviolet" : "purple" },
                  ]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text style={styles.submitBtnTxt}>
                    {loading ? "Carregando..." : "Login"}
                  </Text>
                </Pressable>
                <Text style={styles.registerLink}>NÃO POSSUI CONTA?</Text>
              </View>
            </View>
          </View>
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
    padding: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: 170,
  },
  welcome: {
    fontSize: 27,
    fontWeight: "bold",
    color: "gray",
  },
  welcomeOrange: {
    fontSize: 27,
    color: "orange",
    fontWeight: "bold",
  },
  inputContainer: {
    height: "70%",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    justifyContent: "space-around",
    gap: 20,
  },
  input: {
    width: 300,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    color: "black",
    fontWeight: "thin",
    fontSize: 24,
    padding: 20,
  },
  submitBtn: {
    backgroundColor: "purple",
    width: 200,
    height: 50,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  submitBtnTxt: {
    color: "white",
    fontSize: 23,
  },
  registerLink: {
    color: "black",
    fontSize: 18,
  },
  error: {
    color: 'red'
  }
});

export default Login;
