"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');
const { ObjectId } = require('mongodb'); // Importar ObjectId para trabajar con _id en MongoDB

exports.handler = async (event, context) => {
  // Manejo de CORS para preflight request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: JSON.stringify({ message: 'CORS OK' }) };
  }

  try {
    const client = await clientPromise;
    const id = new ObjectId(event.path.split("/").reverse()[0]); // Obtener el ID desde la URL
    console.log("ID recibido para eliminar publisher:", id);

    const result = await client.db("bookstore").collection("publishers").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return { 
        statusCode: 404, 
        headers, 
        body: JSON.stringify({ message: 'No se encontró el publisher con ese ID.' }) 
      };
    }

    return { 
      statusCode: 200, 
      headers, 
      body: JSON.stringify({ message: 'Publisher eliminado exitosamente' }) 
    };

  } catch (error) {
    console.log("Error al eliminar el publisher:", error);
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ message: 'Error al eliminar el publisher', error: error.message }) 
    };
  }
};
