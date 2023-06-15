import { create } from 'zustand';

export const useExampleStore = create((set) => ({
  value: 0,
  setValue: (newValue) =>
    set((state) => ({
      value: state.value + newValue
    })),
}));
