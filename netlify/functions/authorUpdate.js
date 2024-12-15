"use strict";

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
    const id = event.path.split('/').pop(); // Obtener el ID de la URL
    
    // Verificar si el ID es válido antes de usarlo
    if (!ObjectId.isValid(id)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'ID de autor no válido' })
      };
    }

    const data = JSON.parse(event.body); // Se asegura de que el body sea JSON válido
    console.log("Datos recibidos para actualizar:", data);

    // Realizar la actualización
    const result = await client.db("bookstore").collection("authors").updateOne(
      { _id: new ObjectId(id) }, 
      { $set: data }
    );

    if (result.modifiedCount === 0) {
      return { 
        statusCode: 404, 
        headers, 
        body: JSON.stringify({ message: 'No se encontró el autor con ese ID.' }) 
      };
    }

    return { 
      statusCode: 200, 
      headers, 
      body: JSON.stringify({ message: 'Autor actualizado exitosamente', modifiedCount: result.modifiedCount }) 
    };

  } catch (error) {
    console.log("Error en la actualización del autor:", error);
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ message: 'Error al actualizar el autor', error: error.message }) 
    };
  }
};
