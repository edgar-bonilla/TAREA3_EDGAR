<template>
  <footer class="app-footer">
    <nav>
      <a href="/books">Books</a> |
      <a href="/authors">Authors</a> |
      <a href="/publishers">Publishers</a>
    </nav>
  </footer>
</template>

<style scoped>
.app-footer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem 0;
  font-size: 18px;
  z-index: 1000;
}

nav a {
  color: white;
  margin: 0 1rem;
  text-decoration: none;
  font-size: 38px;
}
</style>
