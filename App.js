import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, Text } from 'react-native';
import { PaperProvider, Appbar } from 'react-native-paper';

export default function Login() {
  return (
    <PaperProvider>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="UoV Student Care" style={styles.appbarContent} />
      </Appbar.Header>

      <View style={styles.container}>
        <Image
          source={{ uri: 'https://vau.ac.lk/wp-content/uploads/2021/07/cropped-UoV_Logo.png' }}
          style={styles.image}
        />

        <Text style={styles.heading}>Student Login</Text>

        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  appbar: {
    width: '100%', 
    backgroundColor: '#510e51',
  },
  appbarContent: {
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  container: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#eef2f3',
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
});
