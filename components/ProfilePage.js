import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { students } from '../assets/StudentsDb'; // Import your student database
import { useNavigation } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for persistent data storage
import FooterMenu from '../common/FooterMenu'; // Import the FooterMenu component from the common folder

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const getLoggedInUsername = async () => {
            try {
                // Fetch the logged-in username from AsyncStorage
                const loggedInUsername = await AsyncStorage.getItem('username');

                // Find the student from your students database using the fetched username
                const student = students.find(student => student.username === loggedInUsername);

                if (student) {
                    setUser(student); // If student exists, set user state
                } else {
                    navigation.navigate('Login'); // If no student found, navigate to Login
                }
            } catch (error) {
                console.error('Error fetching username from AsyncStorage', error); // Log any error
            }
        };

        getLoggedInUsername(); // Call the function to fetch user on page load
    }, [navigation]);

    if (!user) {
        return <Text>Loading...</Text>; // Display loading text while user data is being fetched
    }

    return (
        <PaperProvider>
            <View style={styles.mainContainer}>
                <View style={styles.profileContent}>
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
                </View>
                
                <FooterMenu />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    profileContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});
