import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { students } from '../assets/StudentsDb';
import { useNavigation } from '@react-navigation/native';
import { PaperProvider, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using MaterialCommunityIcons for both icons

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
        <PaperProvider>
            <View style={styles.mainContainer}>

                <View style={styles.content}>
                    <Image
                        source={{ uri: 'https://vau.ac.lk/wp-content/uploads/2021/07/cropped-UoV_Logo.png' }}
                        style={styles.image}
                    />
                </View>

                <View style={styles.profileContent}>
                    <Text style={styles.heading}>Welcome, {user.name}</Text>
                    <Text style={styles.email}>Email: {user.email}</Text>
                    <Text style={styles.phone}>Phone: {user.phone}</Text>
                    <Text style={styles.address}>Address: {user.address}</Text>
                </View>

                <View style={styles.footerMenu}>
                    <TouchableOpacity
                        style={styles.footerIconContainer}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Icon
                            name="account-circle"  
                            size={30}
                            color="#510e51"  
                        />
                        <Text style={styles.footerText}>Profile</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.footerIconContainer}
                        onPress={() => navigation.navigate('Course')}
                    >
                        <Icon
                            name="graduation-cap" 
                            size={30}
                            color="#510e51" 
                        />
                        <Text style={styles.footerText}>Course</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.footerIconContainer}
                        onPress={() => navigation.navigate('Subjects')}
                    >
                        <Icon
                            name="book" 
                            size={30}
                            color="#510e51"  
                        />
                        <Text style={styles.footerText}>Subjects</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#fff',  
    },
    appbar: {
        backgroundColor: '#510e51',
    },
    appbarContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    phone: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    address: {
        fontSize: 16,
        color: '#555',
    },
    footerMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    footerIconContainer: {
        alignItems: 'center',
        flex: 1,
    },
    footerText: {
        marginTop: 5,
        fontSize: 14,
        color: '#510e51',
    },
});
