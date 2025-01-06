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
                    <View style={styles.profileHeader}>
                        <Image source={user.profile_pic} style={[styles.profilePic, { borderWidth: 0 }]} />
                        <Text style={styles.heading}>{user.name}</Text>
                        <Text style={styles.email}>Age: {user.age} | Gender: {user.gender}</Text>
                    </View>

                    <View style={styles.separator} />

                    <Text style={[styles.sectionTitle, styles.leftAligned]}>Contact Information</Text>
                    <Text style={[styles.email, styles.leftAligned]}>Email: {user.email}</Text>
                    <Text style={[styles.phone, styles.leftAligned]}>Phone: {user.phone}</Text>
                    <Text style={[styles.address, styles.leftAligned]}>Address: {user.address}</Text>

                
                    <Text style={[styles.sectionTitle, styles.leftAligned]}>Biological Information</Text>
                    <Text style={[styles.email, styles.leftAligned]}>Gender: {user.gender}</Text>
                    <Text style={[styles.email, styles.leftAligned]}>Age: {user.age}</Text>
                    <Text style={[styles.email, styles.leftAligned]}>Blood Group: {user.blood_group}</Text>
                    <Footer />
                </ScrollView>

                
            </View>
            <FooterMenu style={styles.footerMenu} />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingBottom: 70, 
        position: 'relative', 
    },
    profileContent: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',
    },
    profileHeader: {
        alignItems: 'center', 
        marginBottom: 20,
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
        textAlign: 'center', 
    },
    email: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
    },
    phone: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
        textAlign: 'left',
    },
    address: {
        fontSize: 16,
        color: '#555',
        textAlign: 'left', 
    },
    leftAligned: {
        textAlign: 'left',
        width: '100%',
        paddingLeft: 10,
    },
    separator: {
        width: '80%',
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
        alignSelf: 'center',
    },
    footerMenu: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
});
