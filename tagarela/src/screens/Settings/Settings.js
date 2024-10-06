import { View, StyleSheet, Text, Image } from "react-native"
import Head from '../../components/Head/Head'
import Menu from '../../components/Menu/Menu'
import icons from "../../assets/icons/icons"

const Settings = () => {
  return (
    <>
    <Head />
    <View style={styles.settingsContainer}>
    <View style={styles.settingsTitle}>
        <Text style={styles.title}>CONFIGURAÇÕES</Text>
    </View>
    <View style={styles.settingsActions}>   
    <View style={styles.actionsTitle}>
    <Image source={icons.profile.src} accessibilityLabel={icons.profile.alt}></Image>
    <Text style={styles.text}>SUA CONTA</Text>
    </View>
    <Image source={icons.arrow.src} accessibilityLabel={icons.arrow.alt}></Image>
    </View>
    <View style={styles.settingsActions}>   
    <View style={styles.actionsTitle}>
    <Image source={icons.eye.src} accessibilityLabel={icons.eye.alt}></Image>
    <Text style={styles.text}>ACESSIBILIDADE</Text>
    </View>
    <Image source={icons.arrow.src} accessibilityLabel={icons.arrow.alt}></Image>
    </View>
    <View style={styles.settingsActions}>   
    <View style={styles.actionsTitle}>
    <Image source={icons.notification.src} accessibilityLabel={icons.notification.alt}></Image>
    <Text style={styles.text}>NOTIFICAÇÃO</Text>
    </View>
    <Image source={icons.arrow.src} accessibilityLabel={icons.arrow.alt}></Image>
    </View>
    <View style={styles.settingsActions}>   
    <View style={styles.actionsTitle}>
    <Image source={icons.security.src} accessibilityLabel={icons.security.alt}></Image>
    <Text style={styles.text}>PRIVACIDADE E SEGURANÇA</Text>
    </View>
    <Image source={icons.arrow.src} accessibilityLabel={icons.arrow.alt}></Image>
    </View>
    <View style={styles.settingsActions}>   
    <View style={styles.actionsTitle}>
    <Image source={icons.help.src} accessibilityLabel={icons.help.alt}></Image>
    <Text style={styles.text}>AJUDA</Text>
    </View>
    <Image source={icons.arrow.src} accessibilityLabel={icons.arrow.alt}></Image>
    </View>
    </View>
    <Menu />
    </>
  )
}

const styles = StyleSheet.create({
    settingsContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        zIndex: -2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 23,
        fontWeight: 600,
        color: '#4F4F4F'
    },
    text: {
        fontSize: 18,
        fontWeight: 100,
        color: '#4F4F4F'
    },
    settingsTitle: {
        marginBottom: 25,
        width: '80%',
        height: '7%',
        display: 'flex',
        justifyContent: 'center',
        borderBottomColor: '#7E57C2',
        borderBottomWidth: 1
    },
    settingsActions: {
        marginTop: 20,
        width: '80%',
        height: '7%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionsTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
})

export default Settings