import React, { useState, useEffect } from 'react';
import { students, courses, subjects, marks } from '../assets/StudentsDb';
import { View, Text, FlatList, ActivityIndicator, StyleSheet,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; 
import FooterMenu from '../common/FooterMenu';

export default function Subjects() {
    const [studentData, setStudentData] = useState(null);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchStudentData = async () => {
            const username = await AsyncStorage.getItem('username');

            if (!username) {
                console.error('No username found in AsyncStorage');
                return;
            }

            console.log('Username from AsyncStorage:', username);

            const student = students.find(student => student.username === username); // Matching username, not name

            if (!student) {
                console.error('Student not found');
                return;
            }

            console.log('Student found:', student);

            const studentCourse = courses.find(course => course.id === student.course_id);

            if (!studentCourse) {
                console.error('Course not found');
                return;
            }

            const courseSubjects = subjects.filter(subject => subject.course_id === student.course_id);
            const studentMarks = marks.filter(mark => mark.student_id === student.id);

            const studentSubjects = courseSubjects.map(subject => {
                const mark = studentMarks.find(mark => mark.subject_id === subject.id);
                return {
                    subjectName: subject.name,
                    marks: mark ? mark.marks : 0
                };
            });

            const totalMarks = studentSubjects.reduce((acc, curr) => acc + curr.marks, 0);
            const averageMarks = studentSubjects.length > 0 ? totalMarks / studentSubjects.length : 0;

            setStudentData({
                name: student.name,
                subjects: studentSubjects,
                totalMarks,
                averageMarks
            });

            console.log('Student Data:', studentData);
        };

        fetchStudentData();
    }, []);

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Student Subjects and Marks</Text>
                {studentData ? (
                    <View style={styles.dataContainer}>
                        <Text style={styles.studentName}>{studentData.name}</Text>
                        <Text style={styles.subtitle}>Subjects & Marks</Text>
                        <FlatList
                            data={studentData.subjects}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Text style={styles.subjectItem}>
                                    {item.subjectName}: {item.marks} marks
                                </Text>
                            )}
                        />
                        <Text style={styles.totalMarks}>
                            Total Marks: {studentData.totalMarks}
                        </Text>
                        <Text style={styles.averageMarks}>
                            Average Marks: {studentData.averageMarks.toFixed(2)}
                        </Text>
                    </View>
                ) : (
                    <ActivityIndicator size="large" color="#4CAF50" />
                )}
            </View>

            <FooterMenu />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    dataContainer: {
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    studentName: {
        fontSize: 22,
        fontWeight: '600',
        color: '#444',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#777',
        marginBottom: 15,
    },
    subjectItem: {
        fontSize: 16,
        color: '#555',
        marginVertical: 5,
    },
    totalMarks: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginTop: 10,
    },
    averageMarks: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginTop: 5,
    },
});
