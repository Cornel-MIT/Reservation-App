import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SuperAdminDashboardScreen = ({ navigation }) => {
  const [admins, setAdmins] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 

  const fetchAdmins = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.get('http://localhost:5000/api/admins', { // Correct the endpoint path here.
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setAdmins(response.data);
    } catch (err) {
      setError('Failed to load admins: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = () => {
    navigation.navigate('CreateAdmin'); 
  };

  const renderAdminItem = ({ item }) => (
    <View style={styles.adminItem}>
      <Text style={styles.adminText}>{item.username}</Text>
      <Button
        title="View Details"
        onPress={() => Alert.alert('Admin Details', `Details for ${item.username}`)} 
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Super Admin Dashboard</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button title="Create New Admin" onPress={handleCreateAdmin} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={admins}
          renderItem={renderAdminItem}
          keyExtractor={(item) => item._id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  adminItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  adminText: {
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SuperAdminDashboardScreen;
