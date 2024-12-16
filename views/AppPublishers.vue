<template>
  <div class="container py-4">
    <br><br><br>
    <h1 class="title mb-4">Publishers</h1>

    <!-- Botón para mostrar el formulario de creación -->
    <div v-if="showTab === 'table'">
      <div class="d-flex justify-content-end">
        <button class="btn btn-success mb-4" @click="showCreateForm">Create Publisher</button>
      </div>

      <table class="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th class="text-danger">ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Year Founded</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="publisher in publishers" :key="publisher._id">
            <td>{{ publisher._id }}</td>
            <td>{{ publisher.name }}</td>
            <td>{{ publisher.country }}</td>
            <td>{{ publisher.founded_year }}</td>
            <td class="action-buttons">
              <button class="btn btn-warning btn-sm me-2" @click="editPublisher(publisher)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deletePublisher(publisher)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tab para crear un nuevo publisher -->
    <div v-if="showTab === 'create'">
      <div class="container py-4 d-flex justify-content-center">
        <div class="card" style="width: 50rem;">
          <div class="card-body">
            <h1 class="title mb-4">Create Publisher</h1>

            <form @submit.prevent="createPublisher" class="needs-validation" novalidate>
              <div class="mb-3 row">
                <label for="name" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-7">
                  <input type="text" v-model="newPublisher.name" id="name" class="form-control" placeholder="Enter name" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="country" class="col-sm-2 col-form-label">Country</label>
                <div class="col-sm-7">
                  <input type="text" v-model="newPublisher.country" id="country" class="form-control" placeholder="Enter country" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="founded_year" class="col-sm-2 col-form-label">Year Founded</label>
                <div class="col-sm-7">
                  <input type="number" v-model="newPublisher.founded_year" id="founded_year" class="form-control" placeholder="Enter year founded" required />
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

    <!-- Tab para editar un publisher -->
    <div v-if="showTab === 'edit' && editingPublisher">
      <div class="container py-4 d-flex justify-content-center">
        <div class="card" style="width: 50rem;">
          <div class="card-body">
            <h1 class="title mb-4">Edit Publisher</h1>

            <form @submit.prevent="updatePublisher" class="needs-validation" novalidate>
              <div class="mb-3 row">
                <label for="edit-name" class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-7">
                  <input type="text" v-model="editingPublisher.name" id="edit-name" class="form-control" placeholder="Enter name" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="edit-country" class="col-sm-2 col-form-label">Country</label>
                <div class="col-sm-7">
                  <input type="text" v-model="editingPublisher.country" id="edit-country" class="form-control" placeholder="Enter country" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="edit-founded_year" class="col-sm-2 col-form-label">Year Founded</label>
                <div class="col-sm-7">
                  <input type="number" v-model="editingPublisher.founded_year" id="edit-founded_year" class="form-control" placeholder="Enter year founded" required />
                </div>
              </div>
              <div class="d-flex">
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

<script>
export default {
  data() {
    return {
      publishers: [], 
      newPublisher: { name: '', country: '', founded_year: null }, 
      editingPublisher: null, 
      showTab: 'table', 
    };
  },
  async created() {
    await this.fetchPublishers();
  },
  methods: {
    async fetchPublishers() {
      try {
        const response = await fetch('/.netlify/functions/publishersAll');
        if (response.ok) {
          this.publishers = await response.json();
        } else {
          console.error('Failed to fetch publishers');
        }
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    },
    async createPublisher() {
      try {
        const response = await fetch('/.netlify/functions/publishersInsert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newPublisher),
        });
        if (response.ok) {
          this.newPublisher = { name: '', country: '', founded_year: null };
          this.showTab = 'table';
          await this.fetchPublishers();
        } else {
          console.error('Failed to create publisher');
        }
      } catch (error) {
        console.error('Error creating publisher:', error);
      }
    },
    async updatePublisher() {
      try {
        const response = await fetch(`/.netlify/functions/publishersUpdate/${this.editingPublisher._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.editingPublisher),
        });
        if (response.ok) {
          this.editingPublisher = null;
          this.showTab = 'table';
          await this.fetchPublishers();
        } else {
          console.error('Failed to update publisher');
        }
      } catch (error) {
        console.error('Error updating publisher:', error);
      }
    },
    async deletePublisher(publisher) {
      try {
        const response = await fetch(`/.netlify/functions/publishersDelete/${publisher._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await this.fetchPublishers();
        } else {
          console.error('Failed to delete publisher');
        }
      } catch (error) {
        console.error('Error deleting publisher:', error);
      }
    },
    showCreateForm() {
      this.showTab = 'create';
    },
    cancelCreate() {
      this.showTab = 'table';
    },
    editPublisher(publisher) {
      this.editingPublisher = { ...publisher };
      this.showTab = 'edit';
    },
    cancelEdit() {
      this.showTab = 'table';
      this.editingPublisher = null;
    },
  },
};
</script>

<style scoped>
.action-buttons button {
  margin-right: 5px;
}
</style>
