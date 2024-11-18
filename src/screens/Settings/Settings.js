import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Head from "../../components/Head/Head";
import Menu from "../../components/Menu/Menu";
import icons from "../../assets/icons/icons";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();

  const navigateToAccount = () => {
    navigation.navigate("Account");
  };

  return (
    <>
      <Head />
      <View style={styles.settingsContainer}>
        <View style={styles.settingsTitle}>
          <Text style={styles.title}>CONFIGURAÇÕES</Text>
        </View>

        <TouchableOpacity
          style={styles.settingsActions}
          onPress={navigateToAccount}
        >
          <View style={styles.actionsTitle}>
            <Image
              source={icons.profile.src}
              style={styles.icon}
              accessibilityLabel={icons.profile.alt}
            />
            <Text style={styles.text}>SUA CONTA</Text>
          </View>
          <Image
            source={icons.arrow.src}
            style={styles.iconArrow}
            accessibilityLabel={icons.arrow.alt}
          />
        </TouchableOpacity>

        <View style={styles.settingsActions}>
          <View style={styles.actionsTitle}>
            <Image
              source={icons.eye.src}
              style={styles.icon}
              accessibilityLabel={icons.eye.alt}
            />
            <Text style={styles.text}>ACESSIBILIDADE</Text>
          </View>
          <Image
            source={icons.arrow.src}
            style={styles.iconArrow}
            accessibilityLabel={icons.arrow.alt}
          />
        </View>

        <View style={styles.settingsActions}>
          <View style={styles.actionsTitle}>
            <Image
              source={icons.notification.src}
              style={styles.icon}
              accessibilityLabel={icons.notification.alt}
            />
            <Text style={styles.text}>NOTIFICAÇÃO</Text>
          </View>
          <Image
            source={icons.arrow.src}
            style={styles.iconArrow}
            accessibilityLabel={icons.arrow.alt}
          />
        </View>
      </View>
      <Menu />
    </>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    zIndex: -2,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 200,
  },
  title: {
    fontSize: 23,
    fontWeight: "600",
    color: "#4F4F4F",
  },
  text: {
    fontSize: 18,
    fontWeight: "100",
    color: "#4F4F4F",
  },
  settingsTitle: {
    marginBottom: 25,
    width: "80%",
    height: "7%",
    display: "flex",
    justifyContent: "center",
    borderBottomColor: "#7E57C2",
    borderBottomWidth: 1,
  },
  settingsActions: {
    marginTop: 20,
    width: "80%",
    height: "7%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionsTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    width: 32,
    height: 32,
  },
  iconArrow: {
    width: 25,
    height: 25,
  },
});

export default Settings;
