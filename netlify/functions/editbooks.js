"use strict";

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {
  
  // Verifica si es una solicitud OPTIONS (para manejo de CORS)
  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }
  
  try {
    // Espera a que la promesa de cliente de MongoDB se resuelva
    const client = await clientPromise;
    
    // Verifica si el cuerpo de la solicitud está presente
    if (!event.body) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "El cuerpo de la solicitud está vacío" }) };
    }

    // Parsear los datos de la solicitud
    const data = JSON.parse(event.body);

    // Verifica si el _id es válido
    if (!data._id || !Number.isInteger(Number(data._id))) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "El campo _id debe ser un número entero válido" }) };
    }

    // Eliminar el _id del objeto de actualización si no queremos modificarlo
    const { _id, ...updateFields } = data;

    // Verifica si hay campos para actualizar
    if (Object.keys(updateFields).length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "No se proporcionaron campos para actualizar" }) };
    }

    // Realiza la actualización del libro en la colección "books"
    const result = await client.db("bookstore").collection("books").updateOne(
      { _id: parseInt(_id) },  // Buscar por _id
      { $set: updateFields }   // Actualizar los campos proporcionados
    );

    // Si no se encuentra el libro con el _id proporcionado
    if (result.matchedCount === 0) {
      return { statusCode: 404, headers, body: JSON.stringify({ error: "Libro no encontrado" }) };
    }

    // Respuesta exitosa
    return { statusCode: 200, headers, body: 'Libro actualizado exitosamente' };
  } catch (error) {
    console.error('Error al actualizar:', error);

    // Respuesta de error detallada
    return { statusCode: 422, headers, body: JSON.stringify({ error: error.message }) };
  }
};
