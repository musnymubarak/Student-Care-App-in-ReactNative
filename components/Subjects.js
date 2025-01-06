import React, { useState, useEffect } from 'react';
import { students, courses, subjects, marks } from '../assets/StudentsDb';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FooterMenu from '../common/FooterMenu';
import Footer from '../common/Footer';

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

            const student = students.find(student => student.username === username);

            if (!student) {
                console.error('Student not found');
                return;
            }

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
                courseTitle: studentCourse.name,
                subjects: studentSubjects,
                totalSubjects: studentSubjects.length,
                totalMarks,
                averageMarks: Math.round(averageMarks) 
            });
        };

        fetchStudentData();
    }, []);

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Student Subjects and Marks</Text>
                {studentData ? (
                    <FlatList
                        data={studentData.subjects}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={
                            <View style={styles.headerContainer}>
                                <Text style={styles.courseTitle}>{studentData.courseTitle}</Text>
                                <Text style={styles.totalSubjects}>
                                    {studentData.totalSubjects} Subjects | Average: {studentData.averageMarks}
                                </Text>
                                <View style={styles.tableHeaderRow}>
                                    <Text style={styles.tableHeader}>Subject Name</Text>
                                    <Text style={styles.tableHeader}>Marks</Text>
                                </View>
                            </View>
                        }
                        renderItem={({ item }) => (
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>{item.subjectName}</Text>
                                <Text style={styles.tableCell}>{item.marks}</Text>
                            </View>
                        )}
                        contentContainerStyle={styles.listContent}
                    />
                ) : (
                    <ActivityIndicator size="large" color="#4CAF50" />
                )}
                {/* Wrapping Footer inside ScrollView for scrollability */}
                <ScrollView style={styles.scrollFooter}>
                    <Footer />
                </ScrollView>
                <FooterMenu />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
    },
    headerContainer: {
        marginBottom: 20,
    },
    courseTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#444',
        marginBottom: 10,
        textAlign: 'center',
    },
    totalSubjects: {
        fontSize: 16,
        color: '#777',
        marginBottom: 10,
        textAlign: 'center',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    tableHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableHeader: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        width: '45%',
        textAlign: 'left',
        padding: 10,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableCell: {
        fontSize: 16,
        color: '#555',
        width: '45%',
        padding: 10,
    },
    scrollFooter: {
        marginTop: 20,
    },
});
