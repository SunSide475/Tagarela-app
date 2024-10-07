import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  error: null,
  loading: false,
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      set({ user: response.data.user, error: null, loading: false });
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Login Error";
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
      set({ user: response.data.user, error: null, loading: false });
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
