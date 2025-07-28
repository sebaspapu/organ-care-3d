import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
console.log('MONGODB_URI:', process.env.MONGODB_URI);
// Configuración para MongoDB Atlas
import { MongoClient } from 'mongodb';

// URL de conexión a MongoDB Atlas
// La URL se obtiene de la variable de entorno MONGODB_URI
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI no está definida en las variables de entorno');
}

// Configuración del cliente
const client = new MongoClient(MONGODB_URI);

// Función para conectar a la base de datos
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conectado a MongoDB Atlas');
    return client.db('organcare3d');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

// Función para cerrar la conexión
async function closeConnection() {
  try {
    await client.close();
    console.log('Conexión cerrada');
  } catch (error) {
    console.error('Error al cerrar conexión:', error);
  }
}

export { connectToDatabase, closeConnection, client }; 