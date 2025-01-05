import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FooterMenu = () => {
    const navigation = useNavigation();

    return (
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
                <Icon name="school" size={30} color="#510e51" />
                <Text style={styles.footerText}>Course</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.footerIconContainer}
                onPress={() => navigation.navigate('Subjects')}
            >
                <Icon name="book-open" size={30} color="#510e51" />
                <Text style={styles.footerText}>Subjects</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footerMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        position: 'absolute',  // Fix to bottom
        bottom: 0,
        left: 0,
        right: 0,
    },
    footerIconContainer: {
        alignItems: 'center',
    },
    footerText: {
        marginTop: 5,
        fontSize: 12,
        color: '#510e51',
    },
});

export default FooterMenu;
