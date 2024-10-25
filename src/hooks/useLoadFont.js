import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

const useLoadFont = (fontMap, LoadingComponent) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync(fontMap);
      setFontsLoaded(true);
    };

    loadFonts();
  }, [fontMap]);

  return { fontsLoaded, LoadingComponent };
};

export default useLoadFont;
