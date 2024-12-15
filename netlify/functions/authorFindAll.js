"use strict";

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const client = await clientPromise;
    const db = client.db("bookstore");
    const collection = db.collection("authors");  // Cambié a "authors" en lugar de "books"

    if (event.httpMethod === "GET") {
      // Obtener todos los autores
      const authors = await collection.find({}).toArray();
      return { statusCode: 200, headers, body: JSON.stringify(authors) };
    }

    if (event.httpMethod === "POST") {
      // Crear un nuevo autor
      const newAuthor = JSON.parse(event.body);
      const result = await collection.insertOne(newAuthor);
      return { 
        statusCode: 201, 
        headers, 
        body: JSON.stringify({ ...newAuthor, _id: result.insertedId }) 
      };
    }

    if (event.httpMethod === "PUT") {
      // Actualizar un autor
      const { id } = event.queryStringParameters;
      const updatedAuthor = JSON.parse(event.body);
      const result = await collection.updateOne(
        { _id: new require('mongodb').ObjectId(id) },
        { $set: updatedAuthor }
      );
      if (result.matchedCount === 0) {
        return { statusCode: 404, headers, body: "Author not found" };
      }
      return { statusCode: 200, headers, body: JSON.stringify(updatedAuthor) };
    }

    if (event.httpMethod === "DELETE") {
      // Eliminar un autor
      const { id } = event.queryStringParameters;
      const result = await collection.deleteOne({ _id: new require('mongodb').ObjectId(id) });
      if (result.deletedCount === 0) {
        return { statusCode: 404, headers, body: "Author not found" };
      }
      return { statusCode: 200, headers, body: "Author deleted successfully" };
    }

    return { statusCode: 405, headers, body: "Method Not Allowed" };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
