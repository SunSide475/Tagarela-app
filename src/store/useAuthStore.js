import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const useAuthStore = create((set) => ({
  user: null,
  error: null,
  loading: false,
  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
     
      const response = await axios.post(
        "https://localhost:4000/logar", 
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { user_id } = response.data;

      set({ user: user_id, error: null, loading: false });

      AsyncStorage.setItem("user_id", user_id).catch((error) => {
        console.error("Erro ao salvar user_id no AsyncStorage:", error);
      });

      return { success: true, user_id };
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Login Error";
      console.error("Login Error:", errorMessage);
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },
  register: async (username, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        {
          username,
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      set({ user: response.data, error: null, loading: false });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Registration Error";
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  logout: () => set({ user: null, error: null, loading: false }),
  cleanError: () => set({error: null}),
}));

export default useAuthStore;
