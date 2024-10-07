import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import general from "../../assets/general/genereal";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../store/useAuthStore";

const Register = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, error, loading } = useAuthStore();

  const handleRegister = async () => {
    const { success, error } = await register(username, email, confirmPassword);

    if (success) {
      navigation.navigate("Settings");
      o;
    } else {
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleRegister}
                >
                  <Text style={styles.submitBtnTxt}>Sign In</Text>
                </TouchableOpacity>
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
  error_register: {
    color: "red",
    fontSize: 15,
    marginTop: "2%",
  },
  logoBg: {
    height: "40%",
    width: "100%",
    backgroundColor: "#7e57c2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginInputs: {
    height: "60%",
    width: "100%",
    backgroundColor: "white",
    marginTop: "10%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
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
    color: "#000000",
    textAlign: "left",
    width: "100%",
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
    marginTop: 30,
    justifyContent: "space-around",
    gap: 30,
  },
  input: {
    width: 300,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#f4f3f4",
    color: "black",
    fontWeight: "thin",
    fontSize: 24,
    padding: 20,
  },
  submitBtn: {
    backgroundColor: "orange",
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
});

export default Register;
