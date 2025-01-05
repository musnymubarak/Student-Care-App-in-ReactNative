import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';
import { PaperProvider, Text, Appbar } from 'react-native-paper';

export default function HLoginome() {
    return (
        <PaperProvider>
            <Appbar.Header>
                <Appbar.Content title="Login" />
            </Appbar.Header>

            <View style={styles.container}>

                <Image
                    source={{ uri: 'https://vau.ac.lk/wp-content/uploads/2021/08/University-of-Vavuniya-Logo-1024x1024.png' }}
                    style={styles.image}
                />

                <StatusBar style="auto" />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eef2f3',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        margin: 25,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#34495e',
        textAlign: 'justify',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#2c3e50',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
})