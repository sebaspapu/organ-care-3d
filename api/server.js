import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './mongodb-config.js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = 3000;

// Habilita CORS para todas las rutas y orígenes
app.use(cors());

// Si quieres permitir solo tu frontend:
// app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

// Endpoint GET
app.get('/api/quiz-progress', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: 'userId es requerido' });

    const db = await connectToDatabase();
    const collection = db.collection('quizProgress');
    const progress = await collection.findOne({ userId });

    if (!progress) {
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
      return res.json(initialData);
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint POST
app.post('/api/quiz-progress', async (req, res) => {
  try {
    console.log('Body recibido:', req.body); // <-- Agrega esto
    const { userId, email, displayName, correctAnswers, incorrectAnswers, percentageCompleted, completedQuestions, totalScore } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId es requerido' });

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

    await collection.updateOne(
      { userId },
      { $set: quizData },
      { upsert: true }
    );

    res.json({ success: true, data: quizData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint GET leaderboard
app.get('/api/quiz-leaderboard', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('quizProgress');
    const leaderboard = await collection.find({}).sort({ totalScore: -1, percentageCompleted: -1 }).limit(10).toArray();

    res.json({ success: true, leaderboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});