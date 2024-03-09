import React from "react";
import { screen, render, fireEvent } from "@testing-library/react-native";
import BottomTabs from "./TabNavigation";
import { NavigationContainer } from "@react-navigation/native";

test("Tab Navigation Working", () => {
  const FileScreen = () => <></>;
  const DeleteScreen = () => <></>;

  const App = () => {
    return (
      <NavigationContainer>
        <BottomTabs FileScreen={FileScreen} DeleteScreen={DeleteScreen} />
      </NavigationContainer>
    );
  };
  //   const { getByTestId } = render(<App />);

  //   const FileButton = getByTestId("tab-fileScreen");
  const { queryByRole } = render(<App />);

  const FileButton = queryByRole("button", { name: "File" });
  const DeleteButton = queryByRole("button", { name: "Delete" });
  fireEvent.press(FileButton);
  //   expect(getByTestId("tab-filescreen")).toBeTruthy();
  expect(FileButton).toBeTruthy();
  expect(DeleteButton.props.accessibilityState.selected).toBe(false);
});
