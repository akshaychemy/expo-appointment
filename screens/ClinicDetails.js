import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Button, Alert } from 'react-native';
import { getClinics ,getDoctors} from '../src/api';


export default function ClinicDetails({ route, navigation }) {
  const { clinic } = route.params;
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();
      const filteredDoctors = data.filter(doctor => doctor.clinic._id === clinic._id);
      setDoctors(filteredDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const toggleService = (service) => {
    if (selectedService === service) {
      setSelectedService(null);
      setSelectedDoctor(null);
    } else {
      setSelectedService(service);
    }
  };

  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleAppointmentConfirmation = () => {
    if (selectedService && selectedDoctor) {
      navigation.navigate('Appointment', {
        clinic,
        selectedService,
        selectedDoctor,
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
        {clinic?.services?.map((service, index) => (
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
            {doctors.map(doctor => (
              <TouchableOpacity
                key={doctor._id}
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

