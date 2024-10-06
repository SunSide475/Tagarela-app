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
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "login Error";
      set({ error: errorMessage });
      set({loading: false})
      return error;
    }
  },
  logout: () => set({ user: null, error: null, loading: false }),
}));

export default useAuthStore;
