import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView, ScrollView } from 'react-native';
import Login from './components/Login';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <Login />
          <StatusBar style="auto" />
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}
