import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Image } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import Subjects from './components/Subjects';
import Course from './components/Course';

// Create a Stack Navigator
const Stack = createStackNavigator();

// Common layout component for wrapping screens
const ScreenLayout = ({ children }) => (
  <View style={styles.screenContainer}>
    <Image
      source={{
        uri: 'https://vau.ac.lk/wp-content/uploads/2021/07/cropped-UoV_Logo.png',
      }}
      style={styles.logo}
    />
    <View style={styles.content}>{children}</View>
  </View>
);

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              options={{
                title: 'UoV Student Care',
                headerStyle: { backgroundColor: '#510e51' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            >
              {(props) => (
                <ScreenLayout>
                  <Login {...props} />
                </ScreenLayout>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Profile"
              options={{
                title: 'UoV Student Care',
                headerStyle: { backgroundColor: '#510e51' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            >
              {(props) => (
                <ScreenLayout>
                  <ProfilePage {...props} />
                </ScreenLayout>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Course"
              options={{
                title: 'UoV Student Care',
                headerStyle: { backgroundColor: '#510e51' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            >
              {(props) => (
                <ScreenLayout>
                  <Course {...props} />
                </ScreenLayout>
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Subjects"
              options={{
                title: 'UoV Student Care',
                headerStyle: { backgroundColor: '#510e51' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              }}
            >
              {(props) => (
                <ScreenLayout>
                  <Subjects {...props} />
                </ScreenLayout>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  logo: {
    width: 320,
    height: 100,
    resizeMode: 'contain',
  },
});
