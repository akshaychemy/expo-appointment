import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { bookAppointment } from '../src/api'; // Assuming bookAppointment function is imported correctly

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
      clinic: clinic._id,
      selectedService,
      selectedDoctor: selectedDoctor._id,
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
      <Text style={styles.text}>Clinic: {clinic.name}</Text>
      <Text style={styles.text}>Service: {selectedService}</Text>
      <Text style={styles.text}>Doctor: {selectedDoctor.name}</Text>
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
        keyboardType="phone-pad"
      />
      <View style={styles.buttonContainer}>
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
      <Text style={styles.text}>Selected Date: {date.toDateString()}</Text>
      <Text style={styles.text}>Selected Time: {selectedTimeSlot}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Confirm Appointment"
          onPress={handleConfirmAppointment}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333333',
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
    color: '#333333',
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  slot: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  selectedSlot: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  slotText: {
    fontSize: 16,
    color: '#333333',
  },
});
