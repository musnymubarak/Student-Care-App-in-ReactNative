import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { students } from '../assets/StudentsDb'; // Import the students data
import { courses } from '../assets/StudentsDb'; // Import the courses data
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import FooterMenu from '../common/FooterMenu'; // Import the FooterMenu component

export default function Course() {
    const navigation = useNavigation();
    const [studentData, setStudentData] = useState(null);
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        const getStudentData = async () => {
            try {
                const username = await AsyncStorage.getItem('username'); // Get the username from AsyncStorage

                if (username) {
                    const student = students.find(student => student.username === username);
                    if (student) {
                        setStudentData(student);
                        const course = courses.find(course => course.id === student.course_id);
                        setCourseData(course);
                    }
                }
            } catch (error) {
                console.error('Error fetching username from AsyncStorage', error);
            }
        };

        getStudentData();
    }, []);

    const navigateToSubjects = () => {
        if (courseData) {
            navigation.navigate('Subjects', { subjects: courseData.subjects }); // Pass subjects as params
        }
    };

    if (!studentData || !courseData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.courseName}>{courseData.name}</Text>
                <Text style={styles.courseCode}>Course Code: {courseData.course_code}</Text>
                <Text style={styles.description}>{courseData.description}</Text>
                <Button title="View Subjects" onPress={navigateToSubjects} />
            </View>

            <FooterMenu />
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
    courseCode: {
        fontSize: 18,
        marginBottom: 10,
        fontStyle: 'italic',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});
