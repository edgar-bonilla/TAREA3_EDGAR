"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {
  // Manejo de CORS para preflight request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: JSON.stringify({ message: 'CORS OK' }) };
  }

  try {
    const client = await clientPromise;
    const newPublisher = JSON.parse(event.body);  // Obtener los datos del publisher del cuerpo de la solicitud
    console.log("Datos recibidos para crear publisher:", newPublisher);

    const result = await client.db("bookstore").collection("publishers").insertOne(newPublisher);

    return { 
      statusCode: 201, 
      headers, 
      body: JSON.stringify({ message: 'Publisher creado exitosamente', _id: result.insertedId }) 
    };

  } catch (error) {
    console.log("Error al crear el publisher:", error);
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ message: 'Error al crear el publisher', error: error.message }) 
    };
  }
};
