import { create } from 'zustand';

const useIPStore = create((set) => ({
  ip: '10.0.2.2',
}));

export default useIPStore;
