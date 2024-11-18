import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Head from '../../../components/Head/Head';
import Menu from '../../../components/Menu/Menu';
import icons from "../../../assets/icons/icons";
import { useNavigation } from '@react-navigation/native';
import useAuthStore from "../../../store/useAuthStore";
import useUserId from "../../../hooks/useUserId";
import { useFocusEffect } from "@react-navigation/native";
import React, {useEffect} from "react";


const Account = () => {
  const navigation = useNavigation();
  const { getUserInfo, userInfo } = useAuthStore();
  const { userId } = useUserId();

  useFocusEffect(
    React.useCallback(() => {
      getUserInfo(userId);
    }, [userId])
  );
  

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
            <Text style={styles.text}>Nome:</Text>
            <Text style={styles.value}>{userInfo.username}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Email:</Text>
            <Text style={styles.value}>{userInfo.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.text}>Senha:</Text>
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
    fontSize: 23,
    fontWeight: '600',
    color: '#4F4F4F',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4F4F4F',
  },
  value: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4F4F4F',
    textAlign: 'right',
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
    marginTop: 0,
    paddingHorizontal: 10,
  },
  infoRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  settingsActions: {
    marginTop: 10,
    width: '80%',
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  iconEdit: {
    width: 40,
    height: 40,
    marginTop: 25,
  },
});

export default Account;