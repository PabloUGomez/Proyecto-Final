<template>
  <main>
  
      <h1>Lista de Tareas</h1>
  
      <ul>
          <li>
              <input type="checkbox" id="tarea1">
              <label for="tarea1">Tarea 1</label>
          </li>
          <li>
              <input type="checkbox" id="tarea2">
              <label for="tarea2">Tarea 2</label>
          </li>
          <li>
              <input type="checkbox" id="tarea3">
              <label for="tarea3">Tarea 3</label>
          </li>
          <!-- Puedes agregar más elementos de lista según sea necesario -->
      </ul>
  
    </main>  
  </template>
  <style>
  h1 {
      text-align: center;
  }

  ul {
      list-style-type: none;
      padding: 0;
  }

  li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
  }

  input[type="checkbox"] {
      margin-right: 10px;
  }
</style>
  