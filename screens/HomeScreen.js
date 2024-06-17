import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

import { getClinics } from '../src/api';

export default function HomeScreen({ navigation }) {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const data = await getClinics();
      setClinics(data);
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Clinic</Text>
      <View style={styles.clinicContainer}>
        {clinics.map(clinic => (
          <TouchableOpacity
            key={clinic._id}
            style={styles.item}
            onPress={() => navigation.navigate('ClinicDetails', { clinic })}
          >
            <Image source={{ uri: `http://10.0.2.2:5000/uploads/${clinic.image}` }} style={styles.image} />
            <Text style={styles.itemText}>{clinic.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  clinicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'white',
    width: '48%', // Adjust the width to fit two items per row with space between
  },
  itemText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
