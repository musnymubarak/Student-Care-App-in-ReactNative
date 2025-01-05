import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { PaperProvider, Appbar } from 'react-native-paper';
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
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.mainContainer}>

            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Profile" component={ProfilePage} />
              <Stack.Screen name="Course" component={Course} />
              <Stack.Screen name="Subjects" component={Subjects} />
            </Stack.Navigator>

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
  },
  appbar: {
    backgroundColor: '#510e51',
  },
  appbarContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
