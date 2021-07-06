import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import LoginScreen from './screens/LoginScreen';
export default function App() {
  
  return (
    <SafeAreaProvider>
      <LoginScreen/>
    </SafeAreaProvider>
    
  );
}

