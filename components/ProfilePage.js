import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { students } from '../assets/StudentsDb';
import { useNavigation } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import FooterMenu from '../common/FooterMenu'; 
import Footer from '../common/Footer';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const getLoggedInUsername = async () => {
            try {
                const loggedInUsername = await AsyncStorage.getItem('username');
                const student = students.find(student => student.username === loggedInUsername);

                if (student) {
                    setUser(student); 
                } else {
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.error('Error fetching username from AsyncStorage', error); 
            }
        };

        getLoggedInUsername();
    }, [navigation]);

    if (!user) {
        return <Text>Loading...</Text>; 
    }

    return (
        <PaperProvider>
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={styles.profileContent}>
                    <Image source={user.profile_pic} style={styles.profilePic} />
                    <Text style={styles.heading}>{user.name}</Text>
                    <Text style={styles.email}>Age: {user.age} | Gender: {user.gender}</Text>

                    <View style={styles.separator} />

                    <Text style={[styles.sectionTitle, styles.leftAligned]}>Contact Information</Text>
                    <Text style={[styles.email, styles.leftAligned]}>Email: {user.email}</Text>
                    <Text style={[styles.phone, styles.leftAligned]}>Phone: {user.phone}</Text>
                    <Text style={[styles.address, styles.leftAligned]}>Address: {user.address}</Text>

                    <Text style={[styles.sectionTitle, styles.leftAligned]}>Biological Information</Text>
                    <Text style={[styles.email, styles.leftAligned]}>Gender: {user.gender}</Text>
                    <Text style={[styles.email, styles.leftAligned]}>Age: {user.age}</Text>
                    <Text style={[styles.email, styles.leftAligned]}>Blood Group: {user.blood_group}</Text>
                </ScrollView>

                <Footer />
            </View>
            <FooterMenu style={styles.footerMenu} />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 70, // Space for FooterMenu
    },
    profileContent: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
    },
    profilePic: {
        width: 200,
        height: 200,
        marginBottom: 15,
        borderRadius: 75,
        overflow: 'hidden',
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
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
    separator: {
        width: '80%',
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
    leftAligned: {
        textAlign: 'left',
        width: '100%',
        paddingLeft: 10,
    },
    footerMenu: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
    },
});
