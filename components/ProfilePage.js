import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { students } from '../assets/StudentsDb';
import { useNavigation } from '@react-navigation/native';

export default function ProfilePage() {
    const [user, setUser] = useState(null); 
    const navigation = useNavigation(); 
    useEffect(() => {
        const loggedInUsername = localStorage.getItem('username');
        
        const student = students.find(student => student.username === loggedInUsername);
        
        if (student) {
            setUser(student); 
        } else {
            navigation.navigate('Login');
        }
    }, [navigation]);

    if (!user) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.profileContainer}>
            <Text style={styles.heading}>Welcome, {user.name}</Text>
            <Text style={styles.email}>Email: {user.email}</Text>
            <Text style={styles.phone}>Phone: {user.phone}</Text>
            <Text style={styles.address}>Address: {user.address}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    email: {
        fontSize: 16,
        marginBottom: 10,
    },
    phone: {
        fontSize: 16,
        marginBottom: 10,
    },
    address: {
        fontSize: 16,
    },
});
