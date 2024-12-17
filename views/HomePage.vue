<template>
  <div class="container py-5">
    <div class="text-center mb-4">
      <h1 class="display-4 text-dark">Bienvenido a nuestra Librería con MongoDB</h1>
      <p class="text-dark">Explora un mundo de libros, autores y editoriales con la mejor tecnología detrás.</p>
    </div>
 <br><br><br>
    <div class="row justify-content-center">
      <div class="col-lg-4 mb-4">
        <div class="card border-primary shadow-lg h-100">
          <div class="card-body d-flex flex-column text-center">
            <h5 class="card-title text-success">Explora nuestra colección de libros</h5>
            <p class="card-text">Miles de libros a tu alcance, organizados y listos para ser descubiertos. Impulsado por MongoDB, te garantizamos una búsqueda rápida y eficiente.</p>
            <a href="/books" class="btn btn-primary btn-lg mt-auto">Ver libros</a>
          </div>
        </div>
      </div>

      <div class="col-lg-4 mb-4">
        <div class="card border-secondary shadow-lg h-100">
          <div class="card-body d-flex flex-column text-center">
            <h5 class="card-title text-warning">Conoce a nuestros autores</h5>
            <p class="card-text">Descubre a los creativos detrás de nuestras historias y su legado literario.</p>
            <a href="/authors" class="btn btn-secondary btn-lg mt-auto">Ver autores</a>
          </div>
        </div>
      </div>

      <div class="col-lg-4 mb-4">
        <div class="card border-success shadow-lg h-100">
          <div class="card-body d-flex flex-column text-center">
            <h5 class="card-title text-info">Explora nuestros editores</h5>
            <p class="card-text">Los editores detrás de cada obra, asegurando que solo lo mejor llegue a tus manos.</p>
            <a href="/publishers" class="btn btn-success btn-lg mt-auto">Ver editoriales</a>
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
