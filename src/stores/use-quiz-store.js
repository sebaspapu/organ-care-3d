import { create } from "zustand";
import { saveQuizProgress } from '../services/mongoService';

const useQuizStore = create((set, get) => ({
  quiz: {
    correctAnswers: 0,
    incorrectAnswers: 0,
    percentageCompleted: 0,
    completedQuestions: [],
    totalScore: 0,
    isLoading: false,
    error: null,
    userId: null,
    email: null,
    displayName: null
  },
  incrementQuizProgress: (userId, puntuacion, email, displayName) => {
    set((state) => {
      // Si el usuario cambió, reinicia el quiz
      const isNewUser = state.quiz.userId !== userId;
      const baseQuiz = isNewUser
        ? {
            correctAnswers: 0,
            incorrectAnswers: 0,
            percentageCompleted: 0,
            completedQuestions: [],
            totalScore: 0,
            isLoading: false,
            error: null,
            userId,
            email: email || null,
            displayName: displayName || null
          }
        : { ...state.quiz };
      const isCorrect = puntuacion > 0;
      const newQuiz = {
        ...baseQuiz,
        correctAnswers: baseQuiz.correctAnswers + (isCorrect ? 1 : 0),
        incorrectAnswers: baseQuiz.incorrectAnswers + (isCorrect ? 0 : 1),
        percentageCompleted: Math.min(baseQuiz.percentageCompleted + 25, 100),
        totalScore: baseQuiz.totalScore + puntuacion,
        completedQuestions: [...baseQuiz.completedQuestions, { score: puntuacion, timestamp: new Date().toISOString() }],
        userId,
        email: email || null,
        displayName: displayName || null
      };
      const quizData = {
        userId,
        email: typeof email === 'string' ? email : (email || ''),
        displayName: typeof displayName === 'string' ? displayName : (displayName || ''),
        correctAnswers: newQuiz.correctAnswers || 0,
        incorrectAnswers: newQuiz.incorrectAnswers || 0,
        percentageCompleted: newQuiz.percentageCompleted || 0,
        completedQuestions: newQuiz.completedQuestions || [],
        totalScore: newQuiz.totalScore || 0,
        lastUpdated: new Date().toISOString()
      };
      saveQuizProgress(userId, quizData);
      return { quiz: newQuiz };
    });
  },
  // otros métodos...
}));

export default useQuizStore;
