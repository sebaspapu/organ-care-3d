import { connectToDatabase } from './mongodb-config.js';

// GET - Obtener leaderboard del quiz
export async function GET(request) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('quizProgress');
    
    // Obtener todos los usuarios ordenados por puntuación descendente
    const leaderboard = await collection
      .find({})
      .sort({ totalScore: -1, percentageCompleted: -1 })
      .limit(10) // Top 10
      .toArray();

    // Formatear datos para el frontend
    const formattedLeaderboard = leaderboard.map((user, index) => ({
      rank: index + 1,
      userId: user.userId,
      totalScore: user.totalScore || 0,
      percentageCompleted: user.percentageCompleted || 0,
      correctAnswers: user.correctAnswers || 0,
      incorrectAnswers: user.incorrectAnswers || 0,
      lastUpdated: user.lastUpdated
    }));

    return new Response(JSON.stringify({
      success: true,
      leaderboard: formattedLeaderboard
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error en GET /api/quiz-leaderboard:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 