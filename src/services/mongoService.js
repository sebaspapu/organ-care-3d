// Servicio para MongoDB - usando una API REST
const API_BASE_URL = 'http://localhost:3000/api';

// Función para detectar si estamos en desarrollo
const isDevelopment = false;

export const saveQuizProgress = async (userId, quizData) => {
  try {
    console.log('Enviando POST a /api/quiz-progress:', {
      userId,
      email: quizData.email,
      displayName: quizData.displayName,
      correctAnswers: quizData.correctAnswers,
      incorrectAnswers: quizData.incorrectAnswers,
      percentageCompleted: quizData.percentageCompleted,
      completedQuestions: quizData.completedQuestions || [],
      totalScore: quizData.totalScore || 0,
      lastUpdated: new Date().toISOString()
    });
    if (isDevelopment) {
      return await saveQuizProgressLocal(userId, quizData);
    }

    const response = await fetch(`${API_BASE_URL}/quiz-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        email: quizData.email,
        displayName: quizData.displayName,
        correctAnswers: quizData.correctAnswers,
        incorrectAnswers: quizData.incorrectAnswers,
        percentageCompleted: quizData.percentageCompleted,
        completedQuestions: quizData.completedQuestions || [],
        totalScore: quizData.totalScore || 0,
        lastUpdated: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Error al guardar progreso');
    }

    const result = await response.json();
    console.log('Respuesta del backend:', result);
    console.log('Progreso del quiz guardado exitosamente en MongoDB');
    return result;
  } catch (error) {
    console.error('Error al guardar progreso del quiz:', error);
    // Fallback a localStorage en caso de error
    return await saveQuizProgressLocal(userId, quizData);
  }
};

export const getQuizProgress = async (userId) => {
  try {
    if (isDevelopment) {
      return await getQuizProgressLocal(userId);
    }

    const response = await fetch(`${API_BASE_URL}/quiz-progress?userId=${userId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        // Si no existe, crear un registro inicial
        const initialData = {
          userId,
          correctAnswers: 0,
          incorrectAnswers: 0,
          percentageCompleted: 0,
          completedQuestions: [],
          totalScore: 0,
          lastUpdated: new Date().toISOString()
        };
        
        await saveQuizProgress(userId, initialData);
        return initialData;
      }
      throw new Error('Error al obtener progreso');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener progreso del quiz:', error);
    // Fallback a localStorage en caso de error
    return await getQuizProgressLocal(userId);
  }
};

export const updateQuizProgress = async (userId, newData) => {
  try {
    if (isDevelopment) {
      return await updateQuizProgressLocal(userId, newData);
    }

    const response = await fetch(`${API_BASE_URL}/quiz-progress`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        ...newData,
        lastUpdated: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Error al actualizar progreso');
    }

    const result = await response.json();
    console.log('Progreso del quiz actualizado exitosamente en MongoDB');
    return result;
  } catch (error) {
    console.error('Error al actualizar progreso del quiz:', error);
    // Fallback a localStorage en caso de error
    return await updateQuizProgressLocal(userId, newData);
  }
};

export const getLeaderboard = async () => {
  try {
    if (isDevelopment) {
      // En desarrollo, retornar datos simulados
      return [
        { userId: 'user1', totalScore: 85, percentageCompleted: 100 },
        { userId: 'user2', totalScore: 75, percentageCompleted: 100 },
        { userId: 'user3', totalScore: 65, percentageCompleted: 100 }
      ];
    }

    const response = await fetch(`${API_BASE_URL}/quiz-leaderboard`);
    
    if (!response.ok) {
      throw new Error('Error al obtener leaderboard');
    }

    const data = await response.json();
    return data.leaderboard || [];
  } catch (error) {
    console.error('Error al obtener leaderboard:', error);
    return [];
  }
};

// Función para simular MongoDB localmente (para desarrollo)
export const saveQuizProgressLocal = async (userId, quizData) => {
  try {
    // Simular guardado en localStorage para desarrollo
    const key = `quiz_progress_${userId}`;
    const data = {
      userId,
      correctAnswers: quizData.correctAnswers,
      incorrectAnswers: quizData.incorrectAnswers,
      percentageCompleted: quizData.percentageQuizCompleted,
      completedQuestions: quizData.completedQuestions || [],
      totalScore: quizData.totalScore || 0,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(key, JSON.stringify(data));
    console.log('Progreso del quiz guardado exitosamente (local)');
    return data;
  } catch (error) {
    console.error('Error al guardar progreso del quiz:', error);
    throw error;
  }
};

export const getQuizProgressLocal = async (userId) => {
  try {
    const key = `quiz_progress_${userId}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
      return JSON.parse(stored);
    } else {
      // Crear registro inicial
      const initialData = {
        userId,
        correctAnswers: 0,
        incorrectAnswers: 0,
        percentageCompleted: 0,
        completedQuestions: [],
        totalScore: 0,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
  } catch (error) {
    console.error('Error al obtener progreso del quiz:', error);
    throw error;
  }
};

export const updateQuizProgressLocal = async (userId, newData) => {
  try {
    const key = `quiz_progress_${userId}`;
    const current = localStorage.getItem(key);
    const currentData = current ? JSON.parse(current) : {};
    
    const updatedData = {
      ...currentData,
      ...newData,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(key, JSON.stringify(updatedData));
    console.log('Progreso del quiz actualizado exitosamente (local)');
    return updatedData;
  } catch (error) {
    console.error('Error al actualizar progreso del quiz:', error);
    throw error;
  }
}; 