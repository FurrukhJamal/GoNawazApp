import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "./context";
import { Animated, PanResponder } from "react-native";

const ModalSettingsContentView = (props) => {
  const { setShowSettingsModal, Width } = useContext(AppContext);

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false, // this should be set to false to have child respond to their own onPress
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        if (gestureState.dx > 50) {
          console.log("swiped right");
        } else if (gestureState.dx < -50) {
          console.log("swipped left");

          // Animated.timing(translatedWidth, {
          //   toValue: 50,
          //   duration: 2000,
          //   useNativeDriver: true,
          // }).start();

          setShowSettingsModal(false);
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  ).current;

  const translatedWidth = useRef(new Animated.Value(-Width / 2)).current;

  useEffect(() => {
    Animated.timing(translatedWidth, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [translatedWidth]);

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        ...props.style,
        width: Width / 2,
        transform: [{ translateX: translatedWidth }],
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default ModalSettingsContentView;
