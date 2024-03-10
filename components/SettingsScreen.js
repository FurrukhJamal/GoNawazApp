import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Switch } from "@rneui/themed";
import NumberInputComponent from "./NumberInputComponent";
import { Slider, Icon } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { data } from "../constants";

export default function SettingsPage() {
  const [searchImagesFromLatest, setSearchImagesFromLatest] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.settingsBox}>
        <Text style={styles.settingsHeading}>Search</Text>
        <View style={styles.settingSectionBox}>
          {/* Search from LAtest Images */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17 }}>
              Start search from latest images
            </Text>
            <Switch
              value={searchImagesFromLatest}
              onValueChange={(value) => setSearchImagesFromLatest(value)}
              thumbColor="green"
            />
          </View>
          {/* separator */}
          <View
            style={{
              width: "90%",
              borderTopColor: "rgba(192, 192, 192, 0.5)",
              borderTopWidth: 2,
            }}
          />

          {/* button for number of files to search for */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ width: "80%" }}>
              <Text style={{ fontSize: 17 }}>
                Number of images to scan at a time
              </Text>
              <Text style={{ fontSize: 14, color: "lightgray" }}>
                Searching larger number will take longer to bring back results
              </Text>
            </View>

            <NumberInputComponent color="green" maxRange={100} />
          </View>
        </View>

        <Text style={styles.settingsHeading}>Advanced Settings</Text>
        <View style={{ marginTop: 10 }}>
          <Text>
            These settings determine how strictly AI face matching is performed
            for a given person
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>
            Use a higher number for more accurate results but that may also
            exclude some valid matches
          </Text>
        </View>

        {/* Advanced settings Panel */}
        <View style={styles.settingSectionBox}>
          {data.map((item, key) => (
            <FaceMatchSettingSlider key={key} name={item.name} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const FaceMatchSettingSlider = ({ name }) => {
  const [value, setValue] = useState(0.4);
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text>{name}</Text>
        <Text>{(Math.floor(value * 10 ** 2) / 10 ** 2).toString()}</Text>
      </View>
      <View style={{ width: "80%" }}>
        <Slider
          value={value}
          onValueChange={setValue}
          maximumValue={1.0}
          minimumValue={0}
          step={0.1}
          allowTouchTrack
          minimumTrackTintColor="lightgreen"
          trackStyle={{ height: 5, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <FontAwesome
                name="circle"
                type="font-awesome"
                size={20}
                reverse
                color="green"
              />
            ),
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsBox: {
    marginTop: 10,
    marginLeft: 10,
  },
  settingsHeading: {
    fontSize: 22,
    fontWeight: "bold",
  },
  settingSectionBox: {
    width: "96%",
    backgroundColor: "snow",
    padding: 25,
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
});
