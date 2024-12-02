import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Head from '../../../components/Head/Head';
import Menu from '../../../components/Menu/Menu';
import icons from "../../../assets/icons/icons";
import { useNavigation } from '@react-navigation/native';
import useAuthStore from "../../../store/useAuthStore";
import useUserId from "../../../hooks/useUserId";
import React, { useEffect } from "react";
import { Loading } from "../../../components/Loading/Loading";
import useLoadFont from "../../../hooks/useLoadFont";

const Account = () => {
  const navigation = useNavigation();
  const { getUserInfo, userInfo, loading } = useAuthStore();
  const { userId } = useUserId();

  const { fontsLoaded } = useLoadFont(
    {
      regular: require("../../../assets/fonts/Quicksand-Regular.ttf"),
      medium: require("../../../assets/fonts/Quicksand-Medium.ttf"),
      semiBold: require("../../../assets/fonts/Quicksand-SemiBold.ttf"),
    },
    Loading
  );

  useEffect(() => {
    if (userId) {
      getUserInfo(userId);
    }
  }, [userId, getUserInfo]);

  if (!fontsLoaded || loading || !userInfo) {
    return <Loading />;
  }
  
  const handleEditAccount = () => {
    navigation.navigate('EditAccount');
  };

  return (
    <>
      <Head />
      <View style={styles.settingsContainer}>
        <View style={styles.settingsTitle}>
          <Text style={styles.title}>SUA CONTA</Text>
        </View>
        <View style={styles.settingsActions}>
          <TouchableOpacity onPress={handleEditAccount}>
            <Image source={icons.edit.src} style={styles.iconEdit} accessibilityLabel={icons.edit.alt} />
          </TouchableOpacity>
        </View>
        <View style={styles.accountInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Nome</Text>
            <Text style={styles.value}>{userInfo?.username || 'Nome não encontrado'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.value}>{userInfo?.email || 'Email não encontrado'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Senha</Text>
            <Text style={styles.value}>********</Text>
          </View>

        </View>
        
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
    fontSize: 20,
    color: '#4F4F4F',
    textAlign: 'left',
    flex: 1,
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
});

export default Account;
