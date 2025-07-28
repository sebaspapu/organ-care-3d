import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { connectToDatabase } from './mongodb-config.js';

// GET - Obtener progreso del quiz por usuario
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = await connectToDatabase();
    const collection = db.collection('quizProgress');
    
    const progress = await collection.findOne({ userId });
    
    if (!progress) {
      // Crear registro inicial si no existe
      const initialData = {
        userId,
        correctAnswers: 0,
        incorrectAnswers: 0,
        percentageCompleted: 0,
        completedQuestions: [],
        totalScore: 0,
        lastUpdated: new Date().toISOString()
      };
      
      await collection.insertOne(initialData);
      return new Response(JSON.stringify(initialData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(progress), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error en GET /api/quiz-progress:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// POST - Guardar progreso del quiz
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, email, displayName, correctAnswers, incorrectAnswers, percentageCompleted, completedQuestions, totalScore } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = await connectToDatabase();
    const collection = db.collection('quizProgress');

    const quizData = {
      userId,
      email: email || null,
      displayName: displayName || null,
      correctAnswers: correctAnswers || 0,
      incorrectAnswers: incorrectAnswers || 0,
      percentageCompleted: percentageCompleted || 0,
      completedQuestions: completedQuestions || [],
      totalScore: totalScore || 0,
      lastUpdated: new Date().toISOString()
    };

    // Upsert: insertar si no existe, actualizar si existe
    const result = await collection.updateOne(
      { userId },
      { $set: quizData },
      { upsert: true }
    );

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Progreso guardado exitosamente',
      data: quizData 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error en POST /api/quiz-progress:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// PUT - Actualizar progreso del quiz
export async function PUT(request) {
  try {
    const body = await request.json();
    const { userId, ...updateData } = body;
    
    if (!userId) {
      return new Response(JSON.stringify({ error: 'userId es requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = await connectToDatabase();
    const collection = db.collection('quizProgress');
    
    const updateFields = {
      ...updateData,
      lastUpdated: new Date().toISOString()
    };

    const result = await collection.updateOne(
      { userId },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Progreso actualizado exitosamente' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error en PUT /api/quiz-progress:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 