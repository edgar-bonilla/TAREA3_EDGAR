"use strict";

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');
const { ObjectId } = require('mongodb'); // Importar ObjectId para manejar el _id de forma adecuada

exports.handler = async (event, context) => {

  // Manejo de CORS para preflight request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: JSON.stringify({ message: 'CORS OK' }) };
  }

  try {
    const client = await clientPromise;
    
    // Obtener el id de la URL y convertirlo a ObjectId
    const id = event.path.split("/").reverse()[0];
    
    // Convertir el id de string a ObjectId
    const objectId = new ObjectId(id);

    console.log(`Eliminando libro con _id: ${objectId}`);

    // Eliminar el libro por _id
    const result = await client.db("bookstore").collection("books").deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ message: 'Libro no encontrado' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Libro eliminado exitosamente' })
    };
    
  } catch (error) {
    console.log("Error al eliminar el libro:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Error al eliminar el libro', error: error.message })
    };
  }
};
