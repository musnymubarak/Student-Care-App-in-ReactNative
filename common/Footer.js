import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        UoV © {new Date().getFullYear()}
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: '#510e51',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 18,
    color: 'white',
  },
});

export default Footer;
