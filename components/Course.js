import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const courseData = {
    courseName: 'Computer Science',
    courseDescription: 'An introductory course to computer science, covering topics like algorithms, data structures, and programming.',
    subjects: ['Algorithms', 'Data Structures', 'Discrete Mathematics', 'Database Systems'],
};

export default function Course() {
    const navigation = useNavigation();

    const navigateToSubjects = () => {
        navigation.navigate('Subjects', { subjects: courseData.subjects }); // Pass subjects as params
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.courseName}>{courseData.courseName}</Text>
                <Text style={styles.description}>{courseData.courseDescription}</Text>
                <Button
                    title="View Subjects"
                    onPress={navigateToSubjects}
                />
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
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    courseName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
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
