import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image } from 'react-native';
import { PaperProvider, Appbar, TextInput, Button } from 'react-native-paper';
import { students } from '../assets/StudentsDb'; 
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation(); 

    const handleLogin = async () => {
        const student = students.find(student => student.username === username && student.password === password);

        if (student) {
            // Use AsyncStorage instead of localStorage to store username
            await AsyncStorage.setItem('username', username);
            navigation.navigate('Profile');
        } else {
            alert('Invalid username or password');
        }
    };

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
                        onPress={handleLogin}
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
    appbar: {
        backgroundColor: '#510e51',
    },
    appbarContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
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
