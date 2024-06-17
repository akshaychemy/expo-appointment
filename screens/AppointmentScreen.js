import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { bookAppointment } from './api'; // Import the API call
import { getClinics ,getDoctors,bookAppointment} from '../src/api';


export default function AppointmentScreen({ route, navigation }) {
  const { clinic, selectedService, selectedDoctor } = route.params;
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

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

  const handleConfirmAppointment = async () => {
    if (!name || !phoneNumber || !dateSelected || !selectedTimeSlot) {
      alert('Please enter your name, phone number, select a date, and choose a time slot.');
      return;
    }

    const appointmentData = {
      name,
      phoneNumber,
      clinic: clinic.name,
      selectedService,
      selectedDoctor: selectedDoctor.name,
      date: date.toDateString(),
      timeSlot: selectedTimeSlot
    };

    try {
      await bookAppointment(appointmentData);
      alert(`Appointment confirmed for ${name} with Dr. ${selectedDoctor.name} at ${clinic.name} for ${selectedService} on ${date.toDateString()} at ${selectedTimeSlot}`);
      navigation.goBack();
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Clinic: {clinic.name}</Text>
      <Text>Service: {selectedService}</Text>
      <Text>Doctor: {selectedDoctor.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <View>
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
      {dateSelected && (
        <>
          <Text style={styles.title}>Select Time Slot</Text>
          <View style={styles.timeSlotContainer}>
            {timeSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.slot, selectedTimeSlot === slot && styles.selectedSlot]}
                onPress={() => setSelectedTimeSlot(slot)}
              >
                <Text style={styles.slotText}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      <Text>Selected Date: {date.toDateString()}</Text>
      <Text>Selected Time: {selectedTimeSlot}</Text>
      <Button
        title="Confirm Appointment"
        onPress={handleConfirmAppointment}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    textAlign: 'center',
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  slot: {
    padding: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedSlot: {
    backgroundColor: 'lightblue',
  },
  slotText: {
    color: 'black',
  },
});
