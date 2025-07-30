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

    // Formatear datos para el frontend, agregando rank y eliminando _id
    const formattedLeaderboard = leaderboard.map((user, index) => {
      const { _id, ...rest } = user;
      return {
        ...rest,
        rank: index + 1
      };
    });

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