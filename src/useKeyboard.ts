import React, { useEffect, useState } from "react";
import { Keyboard, EmitterSubscription } from "react-native";

const useKeyboard = () => {
  const [keyboard, setKeyboard] = useState({});

  let keyboardWillShowListener: EmitterSubscription
  let keyboardWillHideListener: EmitterSubscription
  
  function keyboardWillShow(e:any)  {
    setKeyboard({
      isKeyboardShow: true,
      keyboardHeight: e.endCoordinates.height
    });
  };

  function keyboardWillHide(e:any) {
    setKeyboard({
      isKeyboardShow: false,
      keyboardHeight: e.endCoordinates.height
    });
  };

  useEffect(() => {
    keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      keyboardWillShow
    );
    
    keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      keyboardWillHide
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);
  return keyboard;
};

export default useKeyboard;
