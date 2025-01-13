import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import ThemeText from './ThemeText';
import Separator from './Separator';
import ThemeView from './ThemeView';
import {COLOR} from '../constant';
import {useWeightStore, WeightEntry} from '../store';

const WeightEntryForm = () => {
  const {weightData, setWeightData} = useWeightStore(state => state);

  const initialWeight =
    weightData && weightData.length > 0
      ? weightData[weightData.length - 1].weight.toString()
      : '0';

  const [data, setData] = useState<WeightEntry>({
    weight: initialWeight,
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
      setWeightData(data);

      Alert.alert('Successfully Save!');
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ThemeText variant="title" style={{textAlign: 'center'}}>
        Add Weight
      </ThemeText>
      <ThemeView>
        <ThemeText variant="subtitle">Weight (kg)</ThemeText>
        <TextInput
          value={data.weight}
          onChangeText={e => setData(prev => ({...prev, weight: e}))}
          keyboardType="numeric"
          style={{fontSize: 18, fontWeight: '600', color: '#555'}}
        />
      </ThemeView>
      <Separator />

      <ThemeView>
        <ThemeText variant="subtitle">Date</ThemeText>
        <TouchableOpacity onPress={() => showMode('date')}>
          <ThemeText variant="subtitle">
            {data.date.toLocaleDateString()}
          </ThemeText>
        </TouchableOpacity>
      </ThemeView>
      <Separator />

      <ThemeView>
        <ThemeText variant="subtitle">Time</ThemeText>
        <TouchableOpacity onPress={() => showMode('time')}>
          <ThemeText variant="subtitle">
            {data.time.toLocaleTimeString()}
          </ThemeText>
        </TouchableOpacity>
      </ThemeView>
      <Separator />

      {/* <View style={{marginVertical: 10, paddingHorizontal: 10}}>
        <ThemeText variant="subtitle">Notes</ThemeText>
        <View style={styles.inputContainer}>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={150}
            placeholder="Enter your notes here..."
            placeholderTextColor="#aaa"
            onChangeText={e => setData(prev => ({...prev, notes: e}))}
            value={data.notes}
            style={styles.input}
          />
        </View>
      </View> */}

      <TouchableOpacity style={styles.button} onPress={saveEntry}>
        <ThemeText style={{color: '#fff'}} variant="subtitle">
          Save
        </ThemeText>
      </TouchableOpacity>

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
    paddingVertical: 20,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
  },
  input: {
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    height: 100,
  },
  button: {
    backgroundColor: COLOR.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 5,
  },
});

export default WeightEntryForm;
