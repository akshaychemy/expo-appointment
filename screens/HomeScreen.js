import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

// Sample data for clinics and doctors
const clinics = [
  { id: 1, name: 'Clinic A', image: 'https://picsum.photos/200/300', description: 'Description for Clinic A' },
  { id: 2, name: 'Clinic B', image: 'https://picsum.photos/200/300', description: 'Description for Clinic B' },
  { id: 3, name: 'Clinic C', image: 'https://picsum.photos/200/300', description: 'Description for Clinic C' },
  { id: 4, name: 'Clinic D', image: 'https://picsum.photos/200/300', description: 'Description for Clinic d' },
];

const windowWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const renderItem = (clinic) => (
    <TouchableOpacity
      key={clinic.id}
      style={styles.item}
      onPress={() => navigation.navigate('ClinicDetails', { clinic })}
    >
      <Image source={{ uri: clinic.image }} style={styles.image} />
      <Text style={styles.itemText}>{clinic.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Clinic 12</Text>
      <View style={styles.clinicContainer}>
        {clinics.map((clinic, index) => (
          <View key={clinic.id} style={[styles.itemWrapper, index % 2 !== 0 && { marginLeft: 5 }]}>
            {renderItem(clinic)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  clinicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemWrapper: {
    width: '45%', // Adjust as needed for spacing
    marginBottom: 20,
  },
  item: {
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  itemText: {
    marginTop: 10,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
