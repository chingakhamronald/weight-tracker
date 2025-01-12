import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

export interface WeightEntry {
  weight: string;
  date: Date;
  time: Date;
}

interface IWeightStore {
  weightData: WeightEntry[];
  setWeightData: (data: WeightEntry) => void;
}

export const useWeightStore = create<IWeightStore>()(
  persist(
    (set, get) => ({
      weightData: [],
      setWeightData: (e: any) =>
        set({
          weightData: [...get().weightData, e],
        }),
    }),
    {
      name: 'weight-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
