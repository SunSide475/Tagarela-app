import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Register/Register";
import Home from "./src/screens/Home/Home";
import Settings from "./src/screens/Settings/Settings";
import TestCard from "./src/screens/TestCard/TestCard";
import Search from "./src/screens/Search/Search";
import QuizMenu from "./src/screens/QuizMenu/QuizMenu";
import LineCards from "./src/screens/LineCards/LineCards";
import Account from "./src/screens/Settings/Account/Account";
import RegisterCard from "./src/screens/CardsUser/RegisterCard";
import Game from "./src/screens/Game/Game";
import EditAccount from "./src/screens/Settings/EditAccount/EditAccount"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TestCard"
          component={TestCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuizMenu"
          component={QuizMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LineCards"
          component={LineCards}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterCard"
          component={RegisterCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Game"
          component={Game}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="EditAccount"
          component={EditAccount}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
