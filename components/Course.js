import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 


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
        <View style={styles.container}>
            <Text style={styles.courseName}>{courseData.courseName}</Text>
            <Text style={styles.description}>{courseData.courseDescription}</Text>
            <Button
                title="View Subjects"
                onPress={navigateToSubjects}
            />
        </View>
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
});
