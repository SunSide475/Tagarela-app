import { create } from "zustand";
import useIPStore from "./useIPStore";
import axios from "axios";

const useCardsStore = create((set) => ({
  cards: [],
  recentCards: [],
  mostViewedCards: [],
  error: null,
  loading: false,
  
  getAllCards: async () => {
    const { ip } = useIPStore.getState();
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://${ip}:4000/items`);
      set({ cards: response.data.items, error: null, loading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Erro ao carregar";
      set({ error: errorMessage, cards: [], loading: false });
    }
  },
  getRecentCards: async (userId) => {
    const { ip } = useIPStore.getState();
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `http://${ip}:4000/user/${userId}/recents`
      );

      if (Array.isArray(response.data.history)) {
        set({
          recentCards: response.data.history,
          error: null,
          loading: false,
        });
      } else {
        set({ recentCards: [], error: null, loading: false });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Erro ao carregar";
      set({ error: errorMessage, recentCards: [], loading: false });
    }
  },
  getMostViewedCards: async (userId) => {
    const { ip } = useIPStore.getState();
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `http://${ip}:4000/user/${userId}/more_viewed`
      );

      if (Array.isArray(response.data.items)) {
        set({
          mostViewedCards: response.data.items,
          error: null,
          loading: false,
        });
      } else {
        set({ mostViewedCards: [], error: null, loading: false });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Erro ao carregar";
      set({ error: errorMessage, mostViewedCards: [], loading: false });
    }
  },
}));

export default useCardsStore;
