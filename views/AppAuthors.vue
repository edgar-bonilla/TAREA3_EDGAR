<template>
  <div class="container py-4">
    <br><br><br>
    <h1 class="title mb-4">Authors</h1>

 
    <div class="d-flex justify-content-end mb-4">
      <button class="btn btn-success" @click="showCreateForm">Create Author</button>
    </div>

    <div v-if="showTab === 'table'">
      <table class="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th class="text-danger">ID</th>
            <th>Name</th>
            <th>Nationality</th>
            <th>Birth Year</th>
            <th>Fields</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="author in authors" :key="author._id">
            <td>{{ author._id }}</td>
            <td>{{ author.name }}</td>
            <td>{{ author.nationality }}</td>
            <td>{{ author.birth_year }}</td>
            <td>{{ author.fields ? author.fields.join(', ') : '' }}</td>
            <td class="action-buttons">
              <button class="btn btn-warning btn-sm me-2" @click="editAuthor(author)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteAuthor(author)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pestaña para crear un autor -->
    <div v-if="showTab === 'create'">
      <div class="container py-4 d-flex justify-content-center">
        <div class="card" style="width: 50rem;">
          <div class="card-body">
            <h1 class="title mb-4">Create Author</h1>

            <!-- Formulario para crear autor -->
            <form @submit.prevent="createAuthor" class="needs-validation" novalidate>
              <div class="mb-3 row">
                <label for="name" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-7">
                  <input type="text" v-model="newAuthor.name" id="name" class="form-control" placeholder="Enter name" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="nationality" class="col-sm-2 col-form-label">Nationality</label>
                <div class="col-sm-7">
                  <input type="text" v-model="newAuthor.nationality" id="nationality" class="form-control" placeholder="Enter nationality" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="birth_year" class="col-sm-2 col-form-label">Birth Year</label>
                <div class="col-sm-7">
                  <input type="number" v-model="newAuthor.birth_year" id="birth_year" class="form-control" placeholder="Enter birth year" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="fields" class="col-sm-2 col-form-label">Fields</label>
                <div class="col-sm-7">
                  <input type="text" v-model="newAuthor.fields" id="fields" class="form-control" placeholder="Enter fields, separated by commas" required />
                </div>
              </div>
              <div class="d-flex">
                <button type="submit" class="btn btn-primary">Create</button>
                <button type="button" class="btn btn-secondary" @click="cancelCreate">Cancel</button>
              </div>
            </form>
            <br><br><br>
          </div>
        </div>
      </div>
    </div>

    <!-- Pestaña para editar un autor -->
    <div v-if="showTab === 'edit' && editingAuthor">
      <div class="container py-4 d-flex justify-content-center">
        <div class="card" style="width: 50rem;">
          <div class="card-body">
            <h1 class="title mb-4">Edit Author</h1>

            <!-- Formulario de edición de autor -->
            <form @submit.prevent="updateAuthor" class="needs-validation" novalidate>
              <div class="mb-3 row">
                <label for="name" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-7">
                  <input type="text" v-model="editingAuthor.name" id="name" class="form-control" placeholder="Enter name" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="nationality" class="col-sm-2 col-form-label">Nationality</label>
                <div class="col-sm-7">
                  <input type="text" v-model="editingAuthor.nationality" id="nationality" class="form-control" placeholder="Enter nationality" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="birth_year" class="col-sm-2 col-form-label">Birth Year</label>
                <div class="col-sm-7">
                  <input type="number" v-model="editingAuthor.birth_year" id="birth_year" class="form-control" placeholder="Enter birth year" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="fields" class="col-sm-2 col-form-label">Fields</label>
                <div class="col-sm-7">
                  <input type="text" v-model="editingAuthor.fields" id="fields" class="form-control" placeholder="Enter fields, separated by commas" required />
                </div>
              </div>
              <div class="d-flex">
                <button type="submit" class="btn btn-primary">Update</button>
                <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
              </div>
            </form>
            <br><br><br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authors: [], 
      newAuthor: { name: '', nationality: '', birth_year: null, fields: '' }, 
      editingAuthor: null, 
      showTab: 'table', 
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`${this.$url}/.netlify/functions/authorFindAll`);
      
      this.authors = await response.json();
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  },
  methods: {
    showCreateForm() {
      this.showTab = 'create';
    },
    cancelCreate() {
      this.showTab = 'table';
    },
    async createAuthor() {
      // Parse fields from the input string
      
      this.newAuthor.fields = this.newAuthor.fields.split(',').map(field => field.trim());
      
      const response = await fetch(`${this.$url}/.netlify/functions/authorsInsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newAuthor),
      });

      const newAuthor = await response.json();
      this.authors.push(newAuthor);
      this.newAuthor = { name: '', nationality: '', birth_year: null, fields: '' };
      this.showTab = 'table';
    },
    async editAuthor(author) {
      this.editingAuthor = { ...author };
      this.showTab = 'edit';
    },
    cancelEdit() {
      this.showTab = 'table';
      this.editingAuthor = null;
    },
    async updateAuthor() {

  if (Array.isArray(this.editingAuthor.fields)) {
                      
    this.editingAuthor.fields = this.editingAuthor.fields.join(', ');
  }

  
this.editingAuthor.fields = (this.editingAuthor.fields || '').split(',').map(field => field.trim());  // Para el formulario de edición


  const response = await fetch(`${this.$url}/.netlify/functions/authorUpdate/${this.editingAuthor.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.editingAuthor),
  });

  const updatedAuthor = await response.json();
  const index = this.authors.findIndex(author => author.id === updatedAuthor.id);
  if (index !== -1) {
    this.authors[index] = updatedAuthor;
  }
  this.cancelEdit();
},

    async deleteAuthor(author) {
      const response = await fetch(`${this.$url}/.netlify/functions/authorsDelete/${author._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        this.authors = this.authors.filter(a => a._id !== author._id);
      } else {
        console.error('Error deleting author');
      }
    },
  },
};
</script>
