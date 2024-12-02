import { create } from "zustand";
import axios from "axios";
import useIPStore from "./useIPStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create((set) => ({
  user_id: null,
  error: null,
  loading: false,
  userInfo: [],

  login: async (email, password) => {
    const { ip } = useIPStore.getState();
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `http://${ip}:4000/logar`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      set({ user_id: response.data.user_id, error: null, loading: false });

      AsyncStorage.setItem("user_id", response.data.user_id).catch((error) => {
        console.error("Erro ao salvar user_id no AsyncStorage:", error);
      });

      return {
        success: true,
        message: response.data.message,
        user_id: response.data.user_id,
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Login Error";
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  register: async (username, email, password) => {
    const { ip } = useIPStore.getState();
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `http://${ip}:4000/register`,
        {
          username,
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      set({ user: response.data.user_id, error: null, loading: false });

      AsyncStorage.setItem("user_id", response.data.user_id).catch((error) => {
        console.error("Erro ao salvar user_id no AsyncStorage:", error);
      });

      return {
        success: true,
        message: response.data.message,
        user_id: response.data.user_id,
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Registration Error";
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },
  getUserInfo: async (userId) => {
    const { ip } = useIPStore.getState();
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://${ip}:4000/user/${userId}`);

      set({
        userInfo: response.data.user,
        error: null,
        loading: false,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Erro ao carregar";
      set({ error: errorMessage, userInfo: [], loading: false });
    }
  },
  updateUserInfo: async (userId, updatedData) => {
    const { ip } = useIPStore.getState();
    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `http://${ip}:4000/user/${userId}`,
        updatedData,
        { headers: { "Content-Type": "application/json" } }
      );

      set({
        userInfo: response.data.user,
        error: null,
        loading: false,
      });

      return {
        success: true,
        message: "Informações atualizadas com sucesso!",
        userInfo: response.data.user,
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Erro ao atualizar informações";
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },
  logout: async () => {
    set({ user_id: null, userInfo: [], error: null, loading: false });
    try {
      await AsyncStorage.removeItem("user_id");
      return { success: true, message: "Logout bem-sucedido!" };
    } catch (error) {
      console.error("Erro ao limpar o AsyncStorage:", error);
      return { success: false, error: "Erro ao tentar fazer logout." };
    }
  },
  cleanError: () => set({ error: null }),
}));

export default useAuthStore;
