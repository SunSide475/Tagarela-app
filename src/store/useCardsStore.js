import { create } from "zustand";
import axios from "axios";

const useCardsStore = create((set) => ({
  cards: [],
  error: null,
  loading: false,
  getAllCards: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("http://localhost:4000/items");
      set({ cards: response.data.items, error: null, loading: false });
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Erro ao carregar";
      set({ error: errorMessage, cards: [], loading: false });
    }
  },
}));

export default useCardsStore;
