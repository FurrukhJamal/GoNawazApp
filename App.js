import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./components/TabNavigation";
import HomeStack from "./components/HomeStackNavigator";
import DeleteScreen from "./components/DeleteScreen";

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs FileScreen={HomeStack} DeleteScreen={DeleteScreen} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
