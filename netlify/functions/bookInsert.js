"use strict";

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');
const { ObjectId } = require('mongodb'); 

exports.handler = async (event, context) => {
  
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: JSON.stringify({ message: 'CORS OK' }) };
  }

  try {
    const client = await clientPromise;
    const data = JSON.parse(event.body); 


    if (!data._id) {
      data._id = new ObjectId();
    } else {
    
      data._id = new ObjectId(data._id);
    }

    console.log("Datos a insertar:", data);

    const result = await client.db("bookstore").collection("books").insertOne(data);
    
    return { 
      statusCode: 200, 
      headers, 
      body: JSON.stringify({ 
        message: 'Libro insertado exitosamente', 
        insertedId: result.insertedId 
      }) 
    };

  } catch (error) {
    console.log("Error en la inserción del libro:", error);
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ 
        message: 'Error al insertar el libro', 
        error: error.message 
      }) 
    };
  }
};
