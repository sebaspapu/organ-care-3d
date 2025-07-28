# Configuración de MongoDB Atlas para OrganCare3D

## Pasos para configurar MongoDB Atlas

### 1. Crear cuenta en MongoDB Atlas
1. Ve a [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (gratuito)

### 2. Configurar la base de datos
1. En tu cluster, ve a "Collections"
2. Crea una nueva base de datos llamada `organcare3d`
3. Crea una colección llamada `quizProgress`

### 3. Obtener la URL de conexión
1. Ve a "Connect" en tu cluster
2. Selecciona "Connect your application"
3. Copia la URL de conexión
4. Reemplaza `<password>` con tu contraseña de base de datos

### 4. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/organcare3d?retryWrites=true&w=majority
```

### 5. Actualizar la configuración
En `api/mongodb-config.js`, actualiza la URL:

```javascript
const MONGODB_URI = process.env.MONGODB_URI || 'tu-url-de-mongodb-atlas';
```

### 6. Instalar dependencias
```bash
cd api
npm install
```

### 7. Desplegar la API
Puedes desplegar la API en Vercel, Netlify o cualquier plataforma que soporte serverless functions.

### 8. Actualizar el frontend
En `src/services/mongoService.js`, actualiza la URL de la API:

```javascript
const API_BASE_URL = 'https://tu-api-url.vercel.app/api';
```

## Estructura de la base de datos

### Colección: quizProgress
```javascript
{
  userId: "string",
  correctAnswers: number,
  incorrectAnswers: number,
  percentageCompleted: number,
  completedQuestions: array,
  totalScore: number,
  lastUpdated: "ISO string"
}
```

## Endpoints de la API

### GET /api/quiz-progress?userId=123
Obtiene el progreso del quiz para un usuario

### POST /api/quiz-progress
Guarda el progreso del quiz

### PUT /api/quiz-progress
Actualiza el progreso del quiz

### GET /api/quiz-leaderboard
Obtiene el leaderboard de usuarios

## Desarrollo local

Para desarrollo local, el proyecto usa localStorage como fallback. Los datos se guardarán localmente hasta que configures MongoDB Atlas.

## Seguridad

- Nunca subas las credenciales de MongoDB al repositorio
- Usa variables de entorno para las credenciales
- Configura IP whitelist en MongoDB Atlas
- Usa autenticación de usuarios en tu aplicación 