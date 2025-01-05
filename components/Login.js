import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, Text } from 'react-native';
import { PaperProvider, Appbar, TextInput, Button } from 'react-native-paper';

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

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

                <TextInput
                    label="Username"
                    mode="outlined"
                    style={styles.input}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />

                <TextInput
                    label="Password"
                    mode="outlined"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <Button
                    mode="contained"
                    style={styles.button}
                    labelStyle={styles.buttonLabel} // Applied labelStyle for text color
                    onPress={() => console.log('Username:', username, 'Password:', password)}
                >
                    Login
                </Button>

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
        padding: 20,
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
        color: 'white', // Set button text color to white
    },
});
