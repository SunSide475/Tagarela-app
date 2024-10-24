import Head from "../../components/Head/Head";
import {
  View,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

const btns = [
  { id: 1, title: "alimento" },
  { id: 2, title: "necessidade" },
  { id: 3, title: "não sei" },
  { id: 4, title: "alimento" },
  { id: 5, title: "necessidade" },
  { id: 6, title: "não sei" },
];

const Home = () => {
  const renderItem = ({ item }) => (
    <Pressable 
    style={({ pressed }) => [
      styles.button,
      pressed && styles.buttonPressed 
    ]}  
  >
    <Text style={styles.buttonText}>{item.title}</Text>
  </Pressable>
  );
  return (
    <>
      <Head />
      <View>
        <FlatList
          data={btns}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        ></FlatList>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFC247",
    paddingVertical: 13,
    paddingHorizontal: 40,
    borderRadius: 35, 
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFFFFF",
  },
  buttonPressed: {
    opacity: 0.2,
  },
});

export default Home;
