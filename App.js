import { StyleSheet, View, Image , StatusBar} from 'react-native';
import { PaperProvider, Appbar } from 'react-native-paper';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import Subjects from './components/Subjects';
import Course from './components/Course';

// Create a Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.mainContainer}>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Profile" component={ProfilePage} />
                <Stack.Screen name="Course" component={Course} />
                <Stack.Screen name="Subject" component={Subjects} />
              </Stack.Navigator>
            </ScrollView>
          </View>
        </SafeAreaView>
      </NavigationContainer>
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
  scrollContainer: {
    flexGrow: 1,
  }
});
