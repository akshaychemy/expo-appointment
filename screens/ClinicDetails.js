import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import necessary functions from React Navigation

// Sample data for services and doctors
const services = {
  'Clinic A': [
    'Service A1',
    'Service A2',
    'Service A3',
  ],
  'Clinic B': [
    'Service B1',
    'Service B2',
    'Service B3',
  ],
  'Clinic C': [
    'Service C1',
    'Service C2',
    'Service C3',
  ],
};

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

export default function ClinicDetails({ route }) {
  const { clinic } = route.params;
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigation = useNavigation(); // Hook into navigation

  // Function to handle service selection
  const toggleService = (service) => {
    if (selectedService === service) {
      setSelectedService(null);
      setSelectedDoctor(null); // Reset doctor selection if service is deselected
    } else {
      setSelectedService(service);
    }
  };

  // Function to handle doctor selection
  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  // Function to handle appointment booking confirmation
  const handleAppointmentConfirmation = () => {
    if (selectedService && selectedDoctor) {
      // Navigate to AppointmentScreen and pass necessary params
      navigation.navigate('Appointment', {
        clinic: clinic,
        selectedService: selectedService,
        selectedDoctor: selectedDoctor,
      });
    } else {
      Alert.alert('Error', 'Please select both a service and a doctor to proceed.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.clinicHeader}>
        <Image source={{ uri: clinic.image }} style={styles.image} />
        <Text style={styles.title}>{clinic.name}</Text>
      </View>

      <Text style={styles.sectionTitle}>Services Offered</Text>
      <View style={styles.servicesContainer}>
        {services[clinic.name].map((service, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.serviceItem,
              selectedService === service && styles.selectedServiceItem,
            ]}
            onPress={() => toggleService(service)}
          >
            <Text style={styles.serviceText}>{service}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedService && (
        <>
          <Text style={styles.sectionTitle}>Select Doctor</Text>
          <View style={styles.doctorContainer}>
            {doctors[clinic.name].map(doctor => (
              <TouchableOpacity
                key={doctor.id}
                style={[
                  styles.item,
                  selectedDoctor === doctor && styles.selectedItem,
                ]}
                onPress={() => selectDoctor(doctor)}
              >
                <Image source={{ uri: doctor.image }} style={styles.image} />
                <Text style={styles.itemText}>{doctor.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <Button
        title="Book Appointment"
        onPress={handleAppointmentConfirmation}
        disabled={!selectedService || !selectedDoctor}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  clinicHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    marginVertical: 10,
  },
  servicesContainer: {
    marginBottom: 20,
  },
  doctorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  item: {
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'white',
    minWidth: 150,
    maxWidth: '45%',
  },
  selectedItem: {
    backgroundColor: 'lightblue',
  },
  itemText: {
    marginTop: 10,
    textAlign: 'center',
  },
  serviceItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  selectedServiceItem: {
    backgroundColor: 'lightblue',
  },
  serviceText: {
    fontSize: 16,
    textAlign: 'left',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
