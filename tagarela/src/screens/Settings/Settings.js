import { View, StyleSheet, Text, Image } from "react-native"
import Head from '../../components/Head/Head'
import Menu from '../../components/Menu/Menu'
import images from "../../assets/assets"

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
    <Image source={images.profile.src} accessibilityLabel={images.profile.alt}></Image>
    <Text style={styles.text}>SUA CONTA</Text>
    </View>
    <Image source={images.arrow.src} accessibilityLabel={images.arrow.alt}></Image>
    </View>
    <View style={styles.settingsActions}>   
    <View style={styles.actionsTitle}>
    <Image source={images.eye.src} accessibilityLabel={images.eye.alt}></Image>
    <Text style={styles.text}>ACESSIBILIDADE</Text>
    </View>
    <Image source={images.arrow.src} accessibilityLabel={images.arrow.alt}></Image>
    </View>
    <View style={styles.settingsActions}>   
    <View style={styles.actionsTitle}>
    <Image source={images.notification.src} accessibilityLabel={images.notification.alt}></Image>
    <Text style={styles.text}>NOTIFICAÇÃO</Text>
    </View>
    <Image source={images.arrow.src} accessibilityLabel={images.arrow.alt}></Image>
    </View>
    <View style={styles.settingsActions}>   
    <View style={styles.actionsTitle}>
    <Image source={images.security.src} accessibilityLabel={images.security.alt}></Image>
    <Text style={styles.text}>PRIVACIDADE E SEGURANÇA</Text>
    </View>
    <Image source={images.arrow.src} accessibilityLabel={images.arrow.alt}></Image>
    </View>
    <View style={styles.settingsActions}>   
    <View style={styles.actionsTitle}>
    <Image source={images.help.src} accessibilityLabel={images.help.alt}></Image>
    <Text style={styles.text}>AJUDA</Text>
    </View>
    <Image source={images.arrow.src} accessibilityLabel={images.arrow.alt}></Image>
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