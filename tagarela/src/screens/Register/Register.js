import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation
 
export const cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation(); // Usando useNavigation para navegação
 
  const handleRegister = () => {
    // Lógica de cadastro
  };
 
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <View style={styles.container}>
        <View style={styles.registrationBg}>
          <Text style={styles.title}>Cadastre-se</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={name}
              placeholder="NOME"
              onChangeText={setName}
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
            <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
              <Text style={styles.submitText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginLink} // Estilo opcional para o botão de login
              onPress={() => navigation.navigate('Login')} // Navegue para a tela de Login
            >
              <Text style={styles.loginText}>Já tem uma conta? Faça login aqui!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  registrationBg: {
    height: "100%",
    width: "100%",
    backgroundColor: "lightgray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    height: "60%",
  },
  input: {
    width: 300,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    color: "black",
    fontSize: 20,
    padding: 10,
    marginBottom: 15,
  },
  submitBtn: {
    backgroundColor: "blue",
    width: 200,
    height: 50,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: "blue",
    fontSize: 16,
  },
});