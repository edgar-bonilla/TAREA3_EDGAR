<template>
    <div class="container py-5">
      <div class="text-center mb-4">
        <h1 class="display-4 text-dark">Bienvenido a nuestra Librería con mongodb</h1>
        <p class="text-dark">Explora un mundo de libros, autores y editoriales con la mejor tecnología detrás.</p>
      </div>
  
      <div class="row justify-content-center">
        <div class="col-lg-4 mb-4">
          <div class="card border-primary shadow-lg h-100">
            <div class="card-body text-center">
              <h5 class="card-title text-success">Explora nuestra colección de libros</h5>
              <p class="card-text">Miles de libros a tu alcance, organizados y listos para ser descubiertos. Impulsado por MongoDB, te garantizamos una búsqueda rápida y eficiente.</p>
              <a href="/books" class="btn btn-primary btn-lg">Ver libros</a>
            </div>
          </div>
        </div>
  
        <div class="col-lg-4 mb-4">
          <div class="card border-secondary shadow-lg h-100">
            <div class="card-body text-center">
              <h5 class="card-title text-warning">Conoce a nuestros autores</h5>
              <p class="card-text">Descubre a los creativos detrás de nuestras historias y su legado literario.</p>
              <a href="/authors" class="btn btn-secondary btn-lg">Ver autores</a>
            </div>
          </div>
        </div>
  
        <div class="col-lg-4 mb-4">
          <div class="card border-success shadow-lg h-100">
            <div class="card-body text-center">
              <h5 class="card-title text-info">Explora nuestros editores</h5>
              <p class="card-text">Los editores detrás de cada obra, asegurando que solo lo mejor llegue a tus manos.</p>
              <a href="/publishers" class="btn btn-success btn-lg">Ver editoriales</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
  };
  </script>
  
  <style scoped>

  .container {
    margin-top: 40px;
  }
  
  .card-body {
    padding: 30px;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .card-text {
    font-size: 1.1rem;
  }
  
  .btn {
    font-size: 1.2rem;
    margin-top: 15px;
  }
  
  .text-center h3 {
    font-style: italic;
    color: #6c757d;
  }
  
  .card {
    border-radius: 10px;
  }
  
  .card-body {
    background-color: #f8f9fa;
  }
  
  .card-body p {
    color: #495057;
  }
  
  .card-body .btn {
    border-radius: 5px;
  }
  
  .card {
    border-width: 2px;
  }
  
  .card h5, .card p {
    color: #495057;
  }
  
  .card.border-primary {
    border-color: #007bff;
  }
  
  .card.border-secondary {
    border-color: #6c757d;
  }
  
  .card.border-success {
    border-color: #28a745;
  }
  
  .card-body .btn {
    border-radius: 5px;
  }
  </style>
  