import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';

const clinics = ['Clinic A', 'Clinic B', 'Clinic C'];
const doctors = {
  'Clinic A': ['Dr. Smith', 'Dr. Johnson'],
  'Clinic B': ['Dr. Williams', 'Dr. Brown'],
  'Clinic C': ['Dr. Jones', 'Dr. Davis'],
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Clinic</Text>
      <FlatList
        data={clinics}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, selectedClinic === item && styles.selectedItem]}
            onPress={() => {
              setSelectedClinic(item);
              setSelectedDoctor(null); // Reset doctor selection when clinic changes
            }}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />

      {selectedClinic && (
        <>
          <Text style={styles.title}>Select Doctor</Text>
          <FlatList
            data={doctors[selectedClinic]}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.item, selectedDoctor === item && styles.selectedItem]}
                onPress={() => setSelectedDoctor(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </>
      )}

      <Button title="Next" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
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
  item: {
    padding: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedItem: {
    backgroundColor: 'blue',
  },
  itemText: {
    color: 'black',
  },
});
