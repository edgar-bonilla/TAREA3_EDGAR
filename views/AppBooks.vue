<template>
  <div class="container py-4">
    <br><br><br>
    <h1 class="title mb-4">Books</h1>

    <!-- Botón para mostrar el formulario de creación -->
    <div v-if="showTab === 'table'">
      <div class="d-flex justify-content-end">
        <button class="btn btn-success mb-4" @click="showCreateForm">Create Book</button>
      </div>

      <!-- Tabla de libros -->
      <table class="table table-bordered table-hover" style="width: 100%;">
        <thead class="table-dark">
          <tr>
            <th class="text-danger">ID</th>
            <th>Title</th>
            <th>Edition</th>
            <th>Copyright</th>
            <th>Language</th>
            <th>Pages</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book._id">
            <td>{{ book._id }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.edition }}</td>
            <td>{{ book.copyright }}</td>
            <td>{{ book.language }}</td>
            <td>{{ book.pages }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.publisher }}</td>
            <td class="action-buttons">
              <button class="btn btn-warning btn-sm" @click="editBook(book)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteBook(book)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulario de creación -->
    <div v-if="showTab === 'create'">
      <div class="container py-4 d-flex justify-content-center">
        <div class="card" style="width: 50rem;">
          <div class="card-body">
            <h1 class="title mb-4">Create Book</h1>
            <form @submit.prevent="createBook" class="needs-validation" novalidate>
              <div v-for="(value, key) in newBook" :key="key" class="mb-3 row">
                <label :for="key" class="col-sm-2 col-form-label">{{ key }}</label>
                <div class="col-sm-7">
                  <input v-model="newBook[key]" :id="key" class="form-control" :placeholder="'Enter ' + key" required />
                </div>
              </div>
              <div class="d-flex">
                <button type="submit" class="btn btn-primary">Create</button>
                <button type="button" class="btn btn-secondary" @click="cancelCreate">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulario de edición -->
    <div v-if="showTab === 'edit' && editingBook">
      <div class="container py-4 d-flex justify-content-center">
        <div class="card" style="width: 50rem;">
          <div class="card-body">
            <h1 class="title mb-4">Edit Book</h1>
            <form @submit.prevent="updateBook" class="needs-validation" novalidate>
              <div v-for="(value, key) in editingBook" :key="key" class="mb-3 row">
                <label :for="key" class="col-sm-2 col-form-label">{{ key }}</label>
                <div class="col-sm-7">
                  <input v-if="key !== '_id'" v-model="editingBook[key]" :id="key" class="form-control"
                    :placeholder="'Enter ' + key" required />
                  <input v-else disabled v-model="editingBook[key]" :id="key" class="form-control" />
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Update</button>
                <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

body {
  height: 100vh; 
  overflow-y: auto; 
  margin: 0; 
  font-family: Arial, sans-serif; 
}

.container {
  height: 100%; 
  display: flex;
  flex-direction: column;
}

table {
  width: 100%;
  margin-bottom: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      books: [],
      newBook: {
        title: '',
        edition: '',
        copyright: '',
        language: '',
        pages: '',
        author: '',
        publisher: '',
      },
      editingBook: null,
      showTab: 'table',
    };
  },
  async mounted() {
    const response = await fetch('/.netlify/functions/bookFindAll');
    if (response.ok) {
      this.books = await response.json();
    } else {
      console.error('Error fetching books.');
    }
  },
  methods: {
    showCreateForm() {
      this.showTab = 'create';
    },
    cancelCreate() {
      this.showTab = 'table';
    },
    async createBook() {
      const response = await fetch('/.netlify/functions/bookInsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newBook),
      });

      if (response.ok) {
        const newBook = await response.json();
        this.books.push(newBook);
        this.cancelCreate();
      } else {
        console.error('Error creating book.');
      }
    },
    async editBook(book) {
      this.editingBook = { ...book };
      this.showTab = 'edit';
    },
    cancelEdit() {
      this.showTab = 'table';
      this.editingBook = null;
    },
    async updateBook() {
      const { _id, ...bookData } = this.editingBook;
      const response = await fetch(`/.netlify/functions/bookUpdate/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        const updatedBook = await response.json();
        const index = this.books.findIndex(book => book._id === updatedBook._id);
        if (index !== -1) {
          this.books[index] = updatedBook;
        }
        this.cancelEdit();
      } else {
        console.error('Error updating book.');
      }
    },

    async deleteBook(book) {
      const response = await fetch(`/.netlify/functions/bookDelete/${book._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const index = this.books.findIndex(b => b._id === book._id);
        if (index !== -1) {
          this.books.splice(index, 1);
        }
      } else {
        console.error('Error deleting book.');
      }
    },
  },
};
</script>
                                 