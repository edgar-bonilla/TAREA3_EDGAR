<template>
    <footer class="app-footer">
      <p>&copy; 2024 My Application</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: "AppFooter",
  };
  </script>
  
  <style scoped>
  .app-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #333;
    color: white;
    text-align: center;
    padding: 20px 0;
    font-size: 24px;
    z-index: 1000;
  }
  </style>
  