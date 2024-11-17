import { useState, useRef, useEffect } from "react";
import { Animated } from "react-native";

const usePopUp = () => {
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (popUpVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        closePopUp();
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [popUpVisible, animation]);

  const showPopUp = (message) => {
    setPopUpMessage(message);
    setPopUpVisible(true);
  };

  const closePopUp = () => {
    setPopUpVisible(false);
  };

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return {
    popUpVisible,
    popUpMessage,
    showPopUp,
    closePopUp,
    scale,
  };
};

export default usePopUp;
