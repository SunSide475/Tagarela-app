import { create } from "zustand";
import useIPStore from "./useIPStore";
import axios from "axios";

const useCardsStore = create((set) => ({
  levelData: null,
  loading: false,
  error: null,

  getLevelData: async (level) => {
    const { ip } = useIPStore.getState();
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://${ip}:4000/quiz?nivel=${level}`);
      const quizList = response.data[0]?.quiz_game_list;
      if (quizList && quizList.length > 1) { 
        const randomIndices = [];

        while (randomIndices.length < 2) {
          const randomIndex = Math.floor(Math.random() * quizList.length);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }

        const selectedQuizzes = randomIndices.map(index => quizList[index]); 
        set({ levelData: selectedQuizzes, loading: false });
      } else {
        set({ levelData: null, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCardsStore;