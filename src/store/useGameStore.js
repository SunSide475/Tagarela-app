import { create } from "zustand";
import axios from "axios";

const useCardsStore = create((set) => ({
  level1Data: null,
  loading: false,
  error: null,

  getLevelData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`http://10.0.2.2:4000/quiz?nivel=1`);
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
        set({ level1Data: selectedQuizzes, loading: false });
      } else {
        set({ level1Data: null, loading: false }); 
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useCardsStore;