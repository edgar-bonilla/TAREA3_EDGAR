require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Conexión a MongoDB usando Mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch(err => {
    console.error('Error de conexión a MongoDB:', err);
  });

// Definir un modelo básico de libro
const Book = mongoose.model('Book', new mongoose.Schema({
  title: String,
  author: String,
  year: Number
}));

// Rutas de la API

// Crear un libro
app.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Obtener todos los libros
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
