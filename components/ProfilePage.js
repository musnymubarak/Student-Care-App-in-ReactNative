import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { students } from '../assets/StudentsDb'; // Import your student database
import { useNavigation } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Material icons for both icons
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for persistent data storage

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
                    {/* Profile Picture */}
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

                <View style={styles.footerMenu}>
                    <TouchableOpacity
                        style={styles.footerIconContainer}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Icon name="account-circle" size={30} color="#510e51" />
                        <Text style={styles.footerText}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.footerIconContainer}
                        onPress={() => navigation.navigate('Course')}
                    >
                        <Icon name="graduation-cap" size={30} color="#510e51" />
                        <Text style={styles.footerText}>Course</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.footerIconContainer}
                        onPress={() => navigation.navigate('Subjects')}
                    >
                        <Icon name="book" size={30} color="#510e51" />
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
        padding: 20
    },
    profileContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
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
    leftAligned: {
        textAlign: 'left',
        width: '100%',
        paddingLeft: 10,
    },
});
