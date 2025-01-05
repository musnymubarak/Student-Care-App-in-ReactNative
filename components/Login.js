import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { PaperProvider, Appbar, TextInput, Button } from 'react-native-paper';

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <PaperProvider>
            <View style={styles.mainContainer}>

                <View style={styles.content}>
                    <Text style={styles.heading}>STUDENT LOGIN</Text>
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
                        labelStyle={styles.buttonLabel}
                        onPress={() => console.log('Username:', username, 'Password:', password)}
                    >
                        Login
                    </Button>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        UoV © {new Date().getFullYear()}
                    </Text>
                </View>

            </View>

            <StatusBar style="auto" />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    content: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
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
    footer: {
        padding: 10,
        backgroundColor: '#510e51',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    footerText: {
        fontSize: 18,
        color: 'white',
    },
});
