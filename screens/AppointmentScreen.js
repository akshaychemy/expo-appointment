import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../context/AuthContext';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export default function AppointmentScreen({ route, navigation }) {
  const { clinic, doctor } = route.params;
  const { user } = useAuth();
  const [name, setName] = useState('');
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

    if (name && dateSelected && selectedTimeSlot) {
      alert(`Appointment confirmed for ${name} with ${doctor} at ${clinic} on ${date.toDateString()} at ${selectedTimeSlot}`);
      navigation.goBack();
    } else {
      alert('Please enter your name, select a date, and choose a time slot.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Clinic: {clinic}</Text>
      <Text>Doctor: {doctor}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
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
          <FlatList
            data={timeSlots}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.slot, selectedTimeSlot === item && styles.selectedSlot]}
                onPress={() => setSelectedTimeSlot(item)}
              >
                <Text style={styles.slotText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </>
      )}
      <Text>Selected Date: {date.toDateString()}</Text>
      <Text>Selected Time: {selectedTimeSlot}</Text>
      <Button
        title="Confirm Appointment"
        onPress={handleConfirmAppointment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    backgroundColor: 'blue',
  },
  slotText: {
    color: 'black',
  },
});
