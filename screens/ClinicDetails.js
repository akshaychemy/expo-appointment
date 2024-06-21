import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Button, Alert, Dimensions } from 'react-native';
import { getClinics, getDoctors } from '../src/api';

const { width, height } = Dimensions.get('window');

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
      const filteredDoctors = data.filter((doctor) => doctor.clinic._id === clinic._id);
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
        <Image source={{ uri: `http://10.0.2.2:5000/uploads/${clinic.image}` }} style={styles.image} />
        <Text style={styles.title}>{clinic.name}</Text>
        <Text style={styles.titledesc}>{clinic.description}</Text>
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
            {doctors.map((doctor) => (
              <TouchableOpacity
                key={doctor._id}
                style={[
                  styles.item,
                  selectedDoctor === doctor && styles.selectedItem,
                ]}
                onPress={() => selectDoctor(doctor)}
              >
                <Image source={{ uri: `http://10.0.2.2:5000/uploads/${doctor.image}` }} style={styles.image} />
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
    padding: width * 0.05,
  },
  clinicHeader: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.06,
    textAlign: 'center',
    marginVertical: height * 0.01,
  },
  titledesc: {
    fontSize: width * 0.04,
    textAlign: 'center',
    marginVertical: height * 0.01,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    marginVertical: height * 0.01,
  },
  servicesContainer: {
    marginBottom: height * 0.02,
  },
  doctorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  item: {
    alignItems: 'center',
    padding: width * 0.05,
    marginVertical: height * 0.01,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: width * 0.02,
    backgroundColor: 'white',
    minWidth: width * 0.4,
    maxWidth: '45%',
  },
  selectedItem: {
    backgroundColor: 'lightblue',
  },
  itemText: {
    marginTop: height * 0.01,
    textAlign: 'center',
    fontSize: width * 0.04,
  },
  serviceItem: {
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    marginVertical: height * 0.01,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: width * 0.02,
    backgroundColor: 'white',
  },
  selectedServiceItem: {
    backgroundColor: 'lightblue',
  },
  serviceText: {
    fontSize: width * 0.04,
    textAlign: 'left',
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    marginBottom: height * 0.01,
  },
});
