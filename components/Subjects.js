import React from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; 

export default function Subjects() {
    const route = useRoute(); 
    const navigation = useNavigation(); 

    const { subjects } = route.params || {}; 

    const renderSubject = ({ item }) => {
        return (
            <View style={styles.subjectItem}>
                <Text style={styles.subjectText}>{item}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Subjects</Text>
            <FlatList
                data={subjects}
                renderItem={renderSubject}
                keyExtractor={(item, index) => index.toString()}
            />
            <Button
                title="Back to Course"
                onPress={() => navigation.goBack()} 
            />
        </View>
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
});
