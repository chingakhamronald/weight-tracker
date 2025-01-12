import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const WeightEntryForm = () => {
  const [weight, setWeight] = useState('0');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const saveEntry = async () => {
    const newEntry = {weight, notes, date};
    try {
      const storedData = await AsyncStorage.getItem('weightEntries');
      const entries = storedData ? JSON.parse(storedData) : [];
      entries.push(newEntry);
      await AsyncStorage.setItem('weightEntries', JSON.stringify(entries));
      Alert.alert('Entry saved');
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text>Weight</Text>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.flex}>
        <Text>Date</Text>
        <TouchableOpacity onPress={() => showMode('date')}>
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flex}>
        <Text>Time</Text>
        <TouchableOpacity onPress={() => showMode('time')}>
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Notes</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Notes"
          value={notes}
          onChangeText={setNotes}
        />
      </View>
      <View style={{height: 15}} />
      <Button title="Save Entry" onPress={saveEntry} />

      {show && (
        <RNDateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
          is24Hour
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    height: 60,
  },
  input: {
    padding: 10,
    borderRadius: 5,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default WeightEntryForm;
