const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;  // Asegúrate de que tu URI esté bien configurado
const options = {
  serverSelectionTimeoutMS: 30000,  // Aumentar el tiempo de espera
};

let client;

const clientPromise = MongoClient.connect(uri, options).then(client => {
  console.log('Conectado a MongoDB');
  return client;
}).catch(err => {
  console.error('Error de conexión a MongoDB:', err);
  throw err;  // Propaga el error si la conexión falla
});

module.exports = clientPromise;
