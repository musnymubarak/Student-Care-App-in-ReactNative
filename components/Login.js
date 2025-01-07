import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { PaperProvider, TextInput, Button } from 'react-native-paper';
import { students, courses, subjects, marks } from '../assets/StudentsDb'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../common/Footer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Username or password cannot be empty');
            return;
        }

        const student = students.find(
            (student) => student.username === username && student.password === password
        );

        if (student) {
            await AsyncStorage.setItem('username', username);

            // Fetch student's course
            const studentCourse = courses.find(course => course.id === student.course_id);

            if (!studentCourse) {
                setError('Course not found');
                return;
            }

            // Fetch student's subjects
            const studentSubjects = subjects.filter(subject => subject.course_id === student.course_id);

            // Fetch student's marks
            const studentMarks = marks.filter(mark => mark.student_id === student.id);

            // Combine subjects and marks
            const studentSubjectsWithMarks = studentSubjects.map(subject => {
                const mark = studentMarks.find(mark => mark.subject_id === subject.id);
                return {
                    subjectName: subject.name,
                    marks: mark ? mark.marks : 0
                };
            });

            // Navigate to profile page with student data
            navigation.navigate('Profile', { 
                user: student, 
                course: studentCourse.name,
                subjects: studentSubjectsWithMarks,
                totalSubjects: studentSubjectsWithMarks.length,
                totalMarks: studentSubjectsWithMarks.reduce((acc, curr) => acc + curr.marks, 0),
                averageMarks: studentSubjectsWithMarks.length > 0 ? 
                               Math.round(studentSubjectsWithMarks.reduce((acc, curr) => acc + curr.marks, 0) / studentSubjectsWithMarks.length) : 0
            });
        } else {
            setError('Username or password incorrect');
        }
    };

    return (
        <PaperProvider>
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.content}>
                        <Text style={styles.heading}>STUDENT LOGIN</Text>
                        <TextInput
                            label="Username"
                            mode="outlined"
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            label="Password"
                            mode="outlined"
                            style={styles.input}
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={setPassword}
                            right={(
                                <TextInput.Icon
                                    icon={() => (
                                        <Icon
                                            name={passwordVisible ? 'eye-off' : 'eye'}
                                            size={20}
                                            color="#510e51"
                                        />
                                    )}
                                    onPress={() => setPasswordVisible(!passwordVisible)}
                                />
                            )}
                        />
                        <Button
                            mode="contained"
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                            onPress={handleLogin}
                        >
                            Login
                        </Button>

                        {error ? (
                            <View style={styles.errorContainer}>
                                <Image
                                    source={require('../assets/error.png')}
                                    style={styles.errorImage}
                                />
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}
                    </View>
                </ScrollView>
                <Footer />
            </View>
            <StatusBar style="auto" />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#510e51',
    },
    input: {
        width: '80%',
        marginTop: 20,
    },
    button: {
        width: '80%',
        marginTop: 20,
        backgroundColor: '#510e51',
    },
    buttonLabel: {
        color: 'white',
    },
    errorContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorImage: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    errorText: {
        color: '#510e51',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
