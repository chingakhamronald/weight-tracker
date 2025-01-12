import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
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

type FormData = {
  weight: string;
  notes: string;
  date: Date;
  time: Date;
};

const WeightEntryForm = () => {
  const [data, setData] = useState<FormData>({
    weight: '0',
    notes: '',
    date: new Date(),
    time: new Date(),
  });

  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      if (mode === 'date') {
        setData(prev => ({...prev, date: selectedDate}));
      } else {
        setData(prev => ({...prev, time: selectedDate}));
      }
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setMode(currentMode);
    setShow(true);
  };

  const saveEntry = async () => {
    try {
      const storedData = await AsyncStorage.getItem('weightEntries');
      const entries = storedData ? JSON.parse(storedData) : [];
      entries.push({...data});
      await AsyncStorage.setItem('weightEntries', JSON.stringify(entries));
      Alert.alert('Entry saved successfully!');
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text>Weight (kg)</Text>
        <TextInput
          value={data.weight}
          onChangeText={text => setData(prev => ({...prev, weight: text}))}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.flex}>
        <Text>Date</Text>
        <TouchableOpacity onPress={() => showMode('date')}>
          <Text>{data.date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flex}>
        <Text>Time</Text>
        <TouchableOpacity onPress={() => showMode('time')}>
          <Text>{data.time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: 10}}>
        <Text>Notes</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter notes"
          value={data.notes}
          onChangeText={text => setData(prev => ({...prev, notes: text}))}
        />
      </View>

      <View style={{marginVertical: 15}}>
        <Button title="Save Entry" onPress={saveEntry} />
      </View>

      {show && (
        <RNDateTimePicker
          value={mode === 'date' ? data.date : data.time}
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
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
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
