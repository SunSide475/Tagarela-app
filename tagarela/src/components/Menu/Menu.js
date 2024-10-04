import { View, Pressable, StyleSheet, Image } from "react-native"

const Menu = () => {
  return (
    <View style={styles.menuContainer}>
        <Pressable style={({pressed}) => [
                styles.submitBtn,
                {backgroundColor: pressed ? 'darkviolet' : 'purple'}
              ]} onPress={handleLogin}>
              </Pressable>
              <Image  source={require("../../assets/icon-home.png")}></Image>
              <Pressable style={({pressed}) => [
                styles.submitBtn,
                {backgroundColor: pressed ? 'darkviolet' : 'purple'}
              ]} onPress={handleLogin}>
              </Pressable>
              <Image  source={require("../../assets/icon-find.png")}></Image>
              <Pressable style={({pressed}) => [
                styles.submitBtn,
                {backgroundColor: pressed ? 'darkviolet' : 'purple'}
              ]} onPress={handleLogin}>
              </Pressable>
              <Image  source={require("../../assets/icon-alarm.png")}></Image>
              <Pressable style={({pressed}) => [
                styles.submitBtn,
                {backgroundColor: pressed ? 'darkviolet' : 'purple'}
              ]} onPress={handleLogin}>
              </Pressable>
              <Image  source={require("../../assets/icon-settings.png")}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
    menuContainer: {
        
    }
})
export default Menu