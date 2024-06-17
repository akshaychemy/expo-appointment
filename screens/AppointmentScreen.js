import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../context/AuthContext';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export default function AppointmentScreen({ route, navigation }) {
  const { clinic, selectedService, selectedDoctor } = route.params;
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    if (mode === 'date') {
      setDateSelected(true);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleConfirmAppointment = () => {
    if (!user) {
      alert('Please log in to confirm your appointment.');
      navigation.navigate('Login');
      return;
    }

    if (!name.trim() || !phoneNumber.trim()) {
      alert('Please enter your name and phone number to proceed.');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert('Please enter a valid phone number.');
      return;
    }

    if (dateSelected && selectedTimeSlot) {
      const appointmentDetails = {
        name,
        phoneNumber,
        clinic: clinic.name,
        selectedService,
        selectedDoctor: selectedDoctor.name,
        date: date.toDateString(),
        timeSlot: selectedTimeSlot
      };
      alert(`Appointment confirmed for ${appointmentDetails.name} with Dr. ${appointmentDetails.selectedDoctor} at ${appointmentDetails.clinic} for ${appointmentDetails.selectedService} on ${appointmentDetails.date} at ${appointmentDetails.timeSlot}. Contact: ${appointmentDetails.phoneNumber}`);
      navigation.goBack();
    } else {
      alert('Please select a date and choose a time slot.');
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Simple phone number validation: check if it's numeric and 10 digits long
    return /^\d{10}$/.test(phoneNumber);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Appointment Details</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>Clinic: {clinic.name}</Text>
        <Text style={styles.detailText}>Service: {selectedService}</Text>
        <Text style={styles.detailText}>Doctor: {selectedDoctor.name}</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateTimeButton}>
          <Button onPress={showDatepicker} title="Select date" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      
      {dateSelected && (
        <>
          <Text style={styles.title}>Select Time Slot</Text>
          <View style={styles.timeSlotsContainer}>
            {timeSlots.map(slot => (
              <TouchableOpacity
                key={slot}
                style={[styles.slot, selectedTimeSlot === slot && styles.selectedSlot]}
                onPress={() => setSelectedTimeSlot(slot)}
              >
                <Text style={styles.slotText}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>Selected Date: {date.toDateString()}</Text>
        <Text style={styles.dateTimeText}>Selected Time: {selectedTimeSlot}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Confirm Appointment"
          onPress={handleConfirmAppointment}
          disabled={!name || !phoneNumber || !dateSelected || !selectedTimeSlot}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateTimeButton: {
    flex: 1,
    marginRight: 10,
  },
  dateTimeText: {
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  slot: {
    paddingVertical: 12, // Adjusted padding for better touch area
    paddingHorizontal: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    width: '45%', // Adjusted width for two items per row
  },
  selectedSlot: {
    backgroundColor: 'blue',
  },
  slotText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
