<template>
  <div class="p-4 form-container">
    <div>
      List Of
      <br />
    </div>
    <form @submit.prevent="createOrUpdateItem" class="bg-gray-100 p-4 rounded">
      <div>
        <label class="form-label" for="name">Name</label>
        <input class="form-input" type="text" id="name" required v-model="name" />
      </div>
      <div>
        <label class="form-label" for="age">Age</label>
        <input class="form-input" type="number" id="age" required v-model="age" />
      </div>
      <div>
        <label class="form-label" for="contact">Contact</label>
        <input
          class="form-input"
          type="number"
          id="contact"
          v-model="contact"
          required
        />
      </div>
      <div>
        <label class="form-label" for="occupation">Occupation</label>
        <input
          class="form-input"
          type="text"
          id="occupation"
          v-model="occupation"
          required
        />
      </div>
      <button type="submit" class="form-button">
        {{ this.initialItem ? 'Update Item' : 'Create Item' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    initialItem: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      name: '',
      age: '',
      contact: '',
      occupation: '',
      items: [],
    };
  },
  async created() {
    // check if item is in edit mode
    if (this.initialItem) {
      this.name = this.initialItem.name;
      this.age = this.initialItem.age;
      this.contact = this.initialItem.contact;
      this.occupation = this.initialItem.occupation;
    }
  },
  methods: {
    async createOrUpdateItem() {
      const newItem = {
        name: this.name,
        age: this.age,
        contact: this.contact,
        occupation: this.occupation,
      };

      try {

        if (this.initialItem) {
          // If initialItem is provided, update the item using a PUT request
          const itemId = this.initialItem.id; // Assuming ID is part of initialItem
           await this.$axios.put(`/items/${itemId}`, newItem);
          // Update the items array with the updated item
          const index = this.items.findIndex((item) => item.id === itemId);
          // console.log('@@@', index)
          if (index !== -1) {
            this.items.splice(index, 1, this.initialItem);
          }
          this.editingItem = null; // Close the edit modal
        } else {
          // If initialItem is not provided, create a new item using a POST request
         await this.$axios.post('/items', newItem);
        }

        // Send a POST request to the backend to create the item
        // const response = await this.$axios.post('/items', newItem);

        // Emit the event to trigger the update in ItemList
        // this.$emit('itemCreated', response.data);

        // Clear input fields
        this.name = '';
        this.age = '';
        this.contact = '';
        this.occupation = '';
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-input {
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3490dc;
  box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.3);
}

.form-button {
  background-color: #3490dc;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #2779bd;
}
</style>
