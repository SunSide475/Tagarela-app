import { View, StyleSheet, Text, Image } from "react-native"

const Card = ({name, imageUrl}) => {
    return (
        <View style={styles.card}>
            <Image source={{uri: `${imageUrl}`}}
            style={styles.image}></Image>
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'gray',
        width: 155,
        height: 160,
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",       
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,   
        shadowRadius: 8,      
      },
    image: {
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 20,
        color: "#7E57C2",
        fontWeight: "bold"
    }
})

export default Card