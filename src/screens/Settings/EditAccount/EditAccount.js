import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Head from '../../../components/Head/Head';
import Menu from '../../../components/Menu/Menu';
import icons from "../../../assets/icons/icons";
import { useNavigation } from '@react-navigation/native';
import useAuthStore from "../../../store/useAuthStore";
import useUserId from "../../../hooks/useUserId";
import React, { useEffect, useState } from "react";
import { Loading } from "../../../components/Loading/Loading";
import useLoadFont from "../../../hooks/useLoadFont";

const EditAccount = () => {
  const navigation = useNavigation();
  const { getUserInfo, userInfo, loading, updateUserInfo } = useAuthStore();
  const { userId } = useUserId();

  const { fontsLoaded } = useLoadFont(
    {
      regular: require("../../../assets/fonts/Quicksand-Regular.ttf"),
      medium: require("../../../assets/fonts/Quicksand-Medium.ttf"),
      semiBold: require("../../../assets/fonts/Quicksand-SemiBold.ttf"),
    },
    Loading
  );

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userId) {
      getUserInfo(userId);
    }
  }, [userId, getUserInfo]);

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username || '');
      setEmail(userInfo.email || '');
    }
  }, [userInfo]);

  const handleUpdateAccount = async () => {
    const updatedData = { username, email, password };
    const result = await updateUserInfo(userId, updatedData);

    if (result.success) {
      alert("Informações atualizadas com sucesso!");
      navigation.goBack();
    } else {
      alert("Erro ao atualizar as informações.");
    }
  };

  if (!fontsLoaded || loading || !userInfo) {
    return <Loading />;
  }

  return (
    <>
      <Head />
      <View style={styles.settingsContainer}>
        <View style={styles.settingsTitle}>
          <Text style={styles.title}>EDITAR CONTA</Text>
        </View>
        <View style={styles.settingsActions}>
          <TouchableOpacity onPress={handleUpdateAccount}>
            <Image source={icons.edit.src} style={styles.iconEdit} accessibilityLabel={icons.edit.alt} />
          </TouchableOpacity>
        </View>
        <View style={styles.accountInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Nome</Text>
            <TextInput
              style={styles.value}
              value={username}
              onChangeText={setUsername}
              placeholder={userInfo?.username || 'Nome'}

            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.value}
              value={email}
              onChangeText={setEmail}
              placeholder={userInfo?.email || 'Email'}
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Senha</Text>
            <TextInput
              style={styles.value}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="********"
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleUpdateAccount}>
          <Text style={styles.buttonText}>EDITAR</Text>
        </TouchableOpacity>
      </View>
      <Menu />
    </>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 200,
  },
  title: {
    fontFamily: "semiBold",
    fontSize: 24,
    color: '#4F4F4F',
    marginBottom: 10,
  },
  text: {
    fontFamily: "medium",
    fontSize: 25,
    color: '#4F4F4F',
  },
  value: {
    fontFamily: "regular",
    fontSize: 22,
    color: '#000000',
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#ccc',
    marginTop: 5,
    paddingLeft: 10,
  },
  settingsTitle: {
    width: '80%',
    height: '7%',
    display: 'flex',
    justifyContent: 'center',
    borderBottomColor: '#7E57C2',
    borderBottomWidth: 1,
  },
  accountInfo: {
    width: '80%',
    paddingHorizontal: 10,
  },
  infoRow: {
    width: '100%',
    height: '17%',
    marginBottom: 20,
  },
  settingsActions: {
    marginTop: 5,
    width: '80%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  iconEdit: {
    width: 40,
    height: 40,
    marginTop: 25,
  },
  button: {
    backgroundColor: "#FF9900",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: "#fff",
  },
});

export default EditAccount;
