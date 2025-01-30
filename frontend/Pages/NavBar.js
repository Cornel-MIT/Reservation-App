import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();
  const [selectedNav, setSelectedNav] = useState("");

  const handleNavPress = (navItem) => {
    setSelectedNav(navItem);
    navigation.navigate(navItem);
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => handleNavPress('FirstFloor')}>
        <Text style={selectedNav === 'Home' ? styles.navItemSelected : styles.navItem}>FirstFloor</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavPress('Reservations')}>
        <Text style={selectedNav === 'Reservations' ? styles.navItemSelected : styles.navItem}>Reservations</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavPress('Profile')}>
        <Text style={selectedNav === 'Profile' ? styles.navItemSelected : styles.navItem}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    gap: 10,
  },
  navItem: {
    fontSize: 16,
    backgroundColor: '#e2dfdf',
    padding: 10,
    borderRadius: 50,
    color: '#000',
  },
  navItemSelected: {
    fontSize: 16,
    backgroundColor: '#8A1538',
    padding: 10,
    borderRadius: 50,
    color: '#FFF',
  },
});

export default NavBar;