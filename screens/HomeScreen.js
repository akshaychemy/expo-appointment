import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';

// Sample data for clinics and doctors
const clinics = [
  { id: 1, name: 'Clinic A', image: 'https://picsum.photos/200/300', description: 'Description for Clinic A' },
  { id: 2, name: 'Clinic B', image: 'https://picsum.photos/200/300', description: 'Description for Clinic B' },
  { id: 3, name: 'Clinic C', image: 'https://picsum.photos/200/300', description: 'Description for Clinic C' },
];

const doctors = {
  'Clinic A': [
    { id: 1, name: 'Dr. Smith', image: 'https://picsum.photos/200/300', description: 'Description for Dr. Smith' },
    { id: 2, name: 'Dr. Johnson', image: 'https://picsum.photos/200/300', description: 'Description for Dr. Johnson' },
  ],
  'Clinic B': [
    { id: 3, name: 'Dr. Williams', image: 'https://picsum.photos/200/300', description: 'Description for Dr. Williams' },
    { id: 4, name: 'Dr. Brown', image: 'https://picsum.photos/200/300', description: 'Description for Dr. Brown' },
  ],
  'Clinic C': [
    { id: 5, name: 'Dr. Jones', image: 'https://picsum.photos/200/300', description: 'Description for Dr. Jones' },
    { id: 6, name: 'Dr. Davis', image: 'https://picsum.photos/200/300', description: 'Description for Dr. Davis' },
  ],
};

export default function HomeScreen({ navigation }) {
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleNext = () => {
    if (selectedClinic && selectedDoctor) {
      navigation.navigate('Appointment', { clinic: selectedClinic, doctor: selectedDoctor });
    } else {
      alert('Please select a clinic and a doctor.');
    }
  };

  const renderClinicItems = () => (
    clinics.map(clinic => (
      <TouchableOpacity
        key={clinic.id}
        style={[styles.item, selectedClinic === clinic.name && styles.selectedItem]}
        onPress={() => {
          setSelectedClinic(clinic.name);
          setSelectedDoctor(null); // Reset doctor selection when clinic changes
        }}
      >
        <Image source={{ uri: clinic.image }} style={styles.image} />
        <Text style={styles.itemText}>{clinic.name}</Text>
      </TouchableOpacity>
    ))
  );

  const renderDoctorItems = () => (
    selectedClinic && doctors[selectedClinic].map(doctor => (
      <TouchableOpacity
        key={doctor.id}
        style={[styles.item, selectedDoctor === doctor.name && styles.selectedItem]}
        onPress={() => setSelectedDoctor(doctor.name)}
      >
        <Image source={{ uri: doctor.image }} style={styles.image} />
        <Text style={styles.itemText}>{doctor.name}</Text>
      </TouchableOpacity>
    ))
  );

  // Function to render items in rows with two items per row
  const renderItemsInRows = (items) => {
    let rows = [];
    for (let i = 0; i < items.length; i += 2) {
      rows.push(
        <View key={i} style={styles.row}>
          {items[i]}
          {items[i + 1] && items[i + 1]}
        </View>
      );
    }
    return rows;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Select Clinic</Text>
        <View style={styles.rowContainer}>
          {renderItemsInRows(renderClinicItems())}
        </View>

        {selectedClinic && (
          <>
            <Text style={styles.title}>Select Doctor</Text>
            <View style={styles.rowContainer}>
              {renderItemsInRows(renderDoctorItems())}
            </View>
          </>
        )}

        <Button title="Next" onPress={handleNext} disabled={!selectedClinic || !selectedDoctor} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  item: {
    flexBasis: '45%',
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedItem: {
    backgroundColor: 'blue',
  },
  itemText: {
    color: 'black',
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
