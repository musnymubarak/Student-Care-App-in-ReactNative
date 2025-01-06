import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { PaperProvider, TextInput, Button } from 'react-native-paper';
import { students } from '../assets/StudentsDb'; // Remember security warnings!
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../common/Footer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Username or password cannot be empty');
            return;
        }

        const student = students.find(
            (student) => student.username === username && student.password === password
        );

        if (student) {
            await AsyncStorage.setItem('username', username);
            navigation.navigate('Profile');
        } else {
            setError('Username or password incorrect');
        }
    };

    return (
        <PaperProvider>
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.content}>
                        <Text style={styles.heading}>STUDENT LOGIN</Text>
                        <TextInput
                            label="Username"
                            mode="outlined"
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            label="Password"
                            mode="outlined"
                            style={styles.input}
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={setPassword}
                            right={
                                <TextInput.Icon
                                    icon={() => ( // Correct way to render an Icon
                                        <Icon
                                            name={passwordVisible ? 'eye-off' : 'eye'}
                                            size={20}
                                            color="#510e51"
                                        />
                                    )}
                                    onPress={() => setPasswordVisible(!passwordVisible)}
                                />
                            }
                        />
                        <Button
                            mode="contained"
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                            onPress={handleLogin}
                        >
                            Login
                        </Button>

                        {error ? (
                            <View style={styles.errorContainer}>
                                <Image
                                    source={require('../assets/error.png')}
                                    style={styles.errorImage}
                                />
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}
                    </View>
                </ScrollView>
                <Footer />
            </View>
            <StatusBar style="auto" />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#510e51',
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
    errorContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorImage: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    errorText: {
        color: '#510e51',
        fontSize: 16,
        fontWeight: 'bold',
    },
});