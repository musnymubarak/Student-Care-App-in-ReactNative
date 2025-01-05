import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Subjects({ route }) {
    const navigation = useNavigation();

    // Destructure subjects from route params
    const { subjects } = route.params || {};

    const renderSubject = ({ item }) => {
        return (
            <View style={styles.subjectItem}>
                <Text style={styles.subjectText}>{item}</Text>
            </View>
        );
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.heading}>Subjects</Text>
                <FlatList
                    data={subjects}
                    renderItem={renderSubject}
                    keyExtractor={(item, index) => index.toString()}
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
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    subjectItem: {
        padding: 10,
        backgroundColor: '#f1f1f1',
        marginBottom: 10,
        borderRadius: 5,
    },
    subjectText: {
        fontSize: 18,
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
