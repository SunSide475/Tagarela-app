import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, Modal } from "react-native";
import Head from '../../../components/Head/Head';
import Menu from '../../../components/Menu/Menu';
import icons from "../../../assets/icons/icons";
import { useNavigation } from '@react-navigation/native';
import useAuthStore from "../../../store/useAuthStore";
import useUserId from "../../../hooks/useUserId";
import { Loading } from "../../../components/Loading/Loading";
import useLoadFont from "../../../hooks/useLoadFont";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    setIsUpdating(true);  

    const updatedData = { username, email, password };

    try {
      const result = await updateUserInfo(userId, updatedData);

      if (result.success) {
        alert("Informações atualizadas com sucesso!");
        setIsUpdating(false);
        navigation.navigate("Account");
      } else {
        alert("Erro ao atualizar as informações.");
      }
    } catch (error) {
      alert("Erro inesperado durante a atualização.");
    } finally {
      setIsUpdating(false);  
    }
  };

  const handleEditPress = () => {
    setShowModal(true); 
  };

  const handleCancel = () => {
    setShowModal(false); 
  };

  const handleConfirmEdit = () => {
    handleUpdateAccount();
    setShowModal(false);
  };

  if (!fontsLoaded || loading || isUpdating || !userInfo) {
    return <Loading />; 
  }

  return (
    <>
      <Head />
      <KeyboardAwareScrollView
        style={styles.settingsContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View style={styles.settingsTitle}>
          <Text style={styles.title}>EDITAR CONTA</Text>
        </View>
        <View style={styles.settingsActions}>
          <TouchableOpacity onPress={handleEditPress}> 
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
        <TouchableOpacity style={styles.button} onPress={handleEditPress}>
          <Text style={styles.buttonText}>EDITAR</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>TEM CERTEZA QUE DESEJA{"\n"} EDITAR?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, {backgroundColor: "#FFF"}]} onPress={handleCancel}>
                <Text style={[styles.modalButtonText, {color: "#000"}]}>VOLTAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirmEdit}>
                <Text style={styles.modalButtonText}>EDITAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Menu />
    </>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
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
    marginTop: 170,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    gap: 30,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontFamily: 'semiBold',
    fontSize: 20,
    fontFamily: 'medium',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    paddingVertical: 5,
    paddingHorizontal: 50,
    margin: 5,
    backgroundColor: '#FF9900',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'semiBold',
  },
});

export default EditAccount;
