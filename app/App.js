import React, { useState } from "react";
import MainNavigation from "./src/navigation/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import Theme from "./src/styles/Theme";
import Menu from "./src/components/Common/Menu";
import { useFonts } from "expo-font";

const App = () => {
  const [loaded] = useFonts({
    6: require("./src/assets/fonts/NotoSansKR-Black.otf"),
    5: require("./src/assets/fonts/NotoSansKR-Bold.otf"),
    4: require("./src/assets/fonts/NotoSansKR-Medium.otf"),
    3: require("./src/assets/fonts/NotoSansKR-Regular.otf"),
    2: require("./src/assets/fonts/NotoSansKR-Light.otf"),
    1: require("./src/assets/fonts/NotoSansKR-Thin.otf"),
  });

  const [darkMode, setDarkMode] = useState(false);
  const [popMenu, setPopMenu] = useState(false);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={darkMode ? Theme.DarkTheme : Theme.DefaultTheme}>
      <SafeAreaProvider>
        <MainNavigation setPopMenu={setPopMenu} />
      </SafeAreaProvider>
      {popMenu && (
        <Menu
          setPopMenu={setPopMenu}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
