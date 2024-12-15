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
    const id = new ObjectId(event.path.split("/").reverse()[0]); 
    const data = JSON.parse(event.body); 
    console.log("Datos recibidos para actualizar:", data);

    const result = await client.db("bookstore").collection("books").updateOne(
      { _id: id }, 
      { $set: data }
    );

    if (result.modifiedCount === 0) {
      return { 
        statusCode: 404, 
        headers, 
        body: JSON.stringify({ message: 'No se encontró el libro con ese ID.' }) 
      };
    }

    return { 
      statusCode: 200, 
      headers, 
      body: JSON.stringify({ message: 'Libro actualizado exitosamente', modifiedCount: result.modifiedCount }) 
    };

  } catch (error) {
    console.log("Error en la actualización del libro:", error);
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ message: 'Error al actualizar el libro', error: error.message }) 
    };
  }
};
