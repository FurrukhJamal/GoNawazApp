import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./components/TabNavigation";
import HomeStack from "./components/HomeStackNavigator";
import DeleteScreen from "./components/DeleteScreen";
import { AppContext } from "./components/context";
import { useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { useEffect } from "react";

export default function App() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isAppScanning, setAppScanning] = useState(false);
  const Width = Dimensions.get("window").width;
  const Height = Dimensions.get("window").height;
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [images, setImages] = useState([]);
  // const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    (async () => {
      if (permissionResponse !== "granted") {
        await requestPermission();
      }

      const { assets } = await MediaLibrary.getAssetsAsync();
      // console.log(assets);
      setImages(assets);
    })();
  }, []);

  return (
    <AppContext.Provider
      value={{
        showSettingsModal,
        setShowSettingsModal,
        Width,
        Height,
        isAppScanning,
        setAppScanning,
        images,
      }}
    >
      <NavigationContainer>
        <BottomTabs FileScreen={HomeStack} DeleteScreen={DeleteScreen} />
      </NavigationContainer>
    </AppContext.Provider>
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
