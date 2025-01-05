import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { PaperProvider, Appbar } from 'react-native-paper';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import Login from './components/Login';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
          <Appbar.Header style={styles.appbar}>
            <Appbar.Content title="UoV Student Care" style={styles.appbarContent} />
          </Appbar.Header>

          <View style={styles.content}>
            <Image
              source={{ uri: 'https://vau.ac.lk/wp-content/uploads/2021/07/cropped-UoV_Logo.png' }}
              style={styles.image}
            />
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Login />
            <StatusBar style="auto" />
          </ScrollView>
          
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1, 
  },
  mainContainer: {
    flex: 1, 
    justifyContent: 'space-between',
  },
  appbar: {
    backgroundColor: '#510e51',
  },
  appbarContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 150,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    width: '80%',
    marginTop: 20,
  },
  button: {
    width: '80%',
    marginTop: 20,
    backgroundColor: '#510e51',
  },
  buttonLabel: {
    color: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
  }
});
