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
    const collection = db.collection("publishers");  // Cambié a "publishers" en lugar de "authors"

    if (event.httpMethod === "GET") {
      // Obtener todos los publishers
      const publishers = await collection.find({}).toArray();
      return { statusCode: 200, headers, body: JSON.stringify(publishers) };
    }

    if (event.httpMethod === "POST") {
      // Crear un nuevo publisher
      const newPublisher = JSON.parse(event.body);
      const result = await collection.insertOne(newPublisher);
      return { 
        statusCode: 201, 
        headers, 
        body: JSON.stringify({ ...newPublisher, _id: result.insertedId }) 
      };
    }

    if (event.httpMethod === "PUT") {
      // Actualizar un publisher
      const { id } = event.queryStringParameters;
      const updatedPublisher = JSON.parse(event.body);
      const result = await collection.updateOne(
        { _id: new require('mongodb').ObjectId(id) },
        { $set: updatedPublisher }
      );
      if (result.matchedCount === 0) {
        return { statusCode: 404, headers, body: "Publisher not found" };
      }
      return { statusCode: 200, headers, body: JSON.stringify(updatedPublisher) };
    }

    if (event.httpMethod === "DELETE") {
      // Eliminar un publisher
      const { id } = event.queryStringParameters;
      const result = await collection.deleteOne({ _id: new require('mongodb').ObjectId(id) });
      if (result.deletedCount === 0) {
        return { statusCode: 404, headers, body: "Publisher not found" };
      }
      return { statusCode: 200, headers, body: "Publisher deleted successfully" };
    }

    return { statusCode: 405, headers, body: "Method Not Allowed" };
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
