import React, { useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FileScreen from "./FileScreen";
import { Image, View, Text, Pressable } from "react-native";
import { images } from "../constants";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "./context";
import SettingsPage from "./SettingsScreen";

const Stack = createStackNavigator();

function TitleLogo() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        style={{ width: 50, height: 50, borderRadius: 42 }}
        source={images.nawazImage}
      />
      <Text
        style={{
          fontWeight: "bold",
          color: "white",
          fontSize: 22,
          marginLeft: 12,
        }}
      >
        Go Nawaz Go
      </Text>
    </View>
  );
}

function SettingsButton() {
  const navigation = useNavigation();
  const [toggleSettingsModal, setToggleSettingsModal] = useState(false);

  const { showSettingsModal, setShowSettingsModal } = useContext(AppContext);

  return (
    <Pressable
      style={{ marginRight: 15 }}
      onPress={() => {
        console.log("Settings Clicked");
        setShowSettingsModal(!showSettingsModal);
        // setToggleSettingsModal(!toggleSettingsModal);
        // navigation.navigate("Home", { showModal: toggleSettingsModal });
      }}
    >
      <Feather name="settings" size={26} color="white" />
    </Pressable>
  );
}

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={FileScreen}
        options={{
          headerTitle: (props) => <TitleLogo {...props} />,
          headerRight: (props) => <SettingsButton {...props} />,
          headerStyle: {
            backgroundColor: "green",
            // height: 200,
          },

          headerTintColor: "white",
          headerTitleAlign: "left",
        }}
      />

      <Stack.Screen name="Settings" component={SettingsPage} />
    </Stack.Navigator>
  );
}
