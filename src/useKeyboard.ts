import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboard = () => {
  const [keyboard, setKeyboard] = useState({});

  // @ts-ignore TODO: add types
  const keyboardWillShow = e => {
    setKeyboard({
      isKeyboardShow: true,
      keyboardHeight: e.endCoordinates.height
    });
  };

  // @ts-ignore TODO: add types
  const keyboardWillHide = e => {
    setKeyboard({
      isKeyboardShow: false,
      keyboardHeight: e.endCoordinates.height
    });
  };

  useEffect(() => {
    // @ts-ignore TODO: add types
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      keyboardWillShow
    );
    // @ts-ignore TODO: add types
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      keyboardWillHide
    );

    return () => {
      // @ts-ignore TODO: add types
      this.keyboardWillShowListener.remove();
      // @ts-ignore TODO: add types
      this.keyboardWillHideListener.remove();
    };
  }, []);
  return keyboard;
};

export default useKeyboard;
