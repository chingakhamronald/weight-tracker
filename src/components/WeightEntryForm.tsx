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
import ThemeText from './ThemeText';
import Separator from './Separator';

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

  useEffect(() => {
    const loadPreviousData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('weightEntries');
        if (storedData) {
          const entries = JSON.parse(storedData);
          const lastEntry = entries[entries.length - 1];
          if (lastEntry && lastEntry.weight) {
            setData(prev => ({
              ...prev,
              weight: lastEntry.weight,
            }));
          }
        }
      } catch (error) {
        console.error('Error loading previous data:', error);
      }
    };

    loadPreviousData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <ThemeText variant="subtitle">Weight (kg)</ThemeText>
        <TextInput
          value={data.weight}
          onChangeText={e => setData(prev => ({...prev, weight: e}))}
          keyboardType="numeric"
          style={{fontSize: 18, fontWeight: '600', color: '#555'}}
        />
      </View>
      <Separator />

      <View style={styles.flex}>
        <ThemeText variant="subtitle">Date</ThemeText>
        <TouchableOpacity onPress={() => showMode('date')}>
          <ThemeText variant="subtitle">
            {data.date.toLocaleDateString()}
          </ThemeText>
        </TouchableOpacity>
      </View>
      <Separator />

      <View style={styles.flex}>
        <ThemeText variant="subtitle">Time</ThemeText>
        <TouchableOpacity onPress={() => showMode('time')}>
          <ThemeText variant="subtitle">
            {data.time.toLocaleTimeString()}
          </ThemeText>
        </TouchableOpacity>
      </View>
      <Separator />

      <View style={{marginVertical: 10}}>
        <ThemeText variant="subtitle">Notes</ThemeText>
        <TextInput
          style={styles.input}
          placeholder="Enter notes"
          value={data.notes}
          onChangeText={e => setData(prev => ({...prev, notes: e}))}
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
    paddingHorizontal: 10,
  },
});

export default WeightEntryForm;
