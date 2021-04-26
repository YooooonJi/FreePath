import "react-native-gesture-handler";
import React from "react";
import MainNavigation from "./src/navigation/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <MainNavigation />
    </SafeAreaProvider>
  );
};

export default App;
