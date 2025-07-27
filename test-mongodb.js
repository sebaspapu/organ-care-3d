// Script de prueba para MongoDB Atlas
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Configurar dotenv
dotenv.config();

async function testMongoDBConnection() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI no está definida en .env');
    console.log('Asegúrate de crear el archivo .env con tu URL de MongoDB Atlas');
    return;
  }

  console.log('🔗 Probando conexión a MongoDB Atlas...');
  console.log('URL:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Ocultar credenciales

  const client = new MongoClient(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Conectar a MongoDB
    await client.connect();
    console.log('✅ Conexión exitosa a MongoDB Atlas');

    // Obtener la base de datos
    const db = client.db('organcare3d');
    console.log('✅ Base de datos "organcare3d" accesible');

    // Obtener la colección
    const collection = db.collection('quizProgress');
    console.log('✅ Colección "quizProgress" accesible');

    // Insertar un documento de prueba
    const testData = {
      userId: 'test-user-' + Date.now(),
      correctAnswers: 3,
      incorrectAnswers: 1,
      percentageCompleted: 75,
      completedQuestions: [
        { score: 1, timestamp: new Date().toISOString() },
        { score: 0.5, timestamp: new Date().toISOString() }
      ],
      totalScore: 3.5,
      lastUpdated: new Date().toISOString()
    };

    const result = await collection.insertOne(testData);
    console.log('✅ Documento de prueba insertado:', result.insertedId);

    // Leer el documento insertado
    const savedData = await collection.findOne({ _id: result.insertedId });
    console.log('✅ Documento leído correctamente:', {
      userId: savedData.userId,
      totalScore: savedData.totalScore,
      percentageCompleted: savedData.percentageCompleted
    });

    // Limpiar el documento de prueba
    await collection.deleteOne({ _id: result.insertedId });
    console.log('✅ Documento de prueba eliminado');

    console.log('\n🎉 ¡Todas las pruebas pasaron! MongoDB Atlas está configurado correctamente.');

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
    console.log('\n🔧 Posibles soluciones:');
    console.log('1. Verifica que la URL en .env sea correcta');
    console.log('2. Asegúrate de que la contraseña sea la correcta');
    console.log('3. Verifica que el usuario tenga permisos de lectura/escritura');
    console.log('4. Asegúrate de que tu IP esté en la whitelist de MongoDB Atlas');
  } finally {
    await client.close();
    console.log('🔌 Conexión cerrada');
  }
}

// Ejecutar la prueba
testMongoDBConnection(); 